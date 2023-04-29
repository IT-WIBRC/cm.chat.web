describe("User Login", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should be successful when all fields are well filled", () => {
    cy.intercept(
      {
        method: "POST",
        url: "/api/v1/user/login",
      },
      {
        statusCode: 200,
        body: {
          userId: "989444c6-bd5e-4bef-9e27-2d8f6e22a637",
          token: {
            accessToken: "23d3d3d",
            expirationDate: "232442",
          },
        },
      }
    );
    cy.get("[data-test='email-field']").type("wibrc@gm.fr");
    cy.get("[data-test='password-field']").type("wibr#4frf");

    cy.get("[data-test='submit-btn']").click();

    cy.get("[data-test='welcome']").should("have.text", "User layout");
  });

  describe("Failing cases", () => {
    it("should display an error message when any fields are filled", () => {
      cy.get("[data-test='submit-btn']").click();
      cy.get("[data-test='email-field'] [data-test='email-error']").should(
        "have.text",
        "Email is required"
      );
      cy.get("[data-test='password-field'] [data-test='password-error']").should(
        "have.text",
        "Password is required"
      );
    });

    it("should display an error message when we provide an invalid email", () => {
      cy.get("[data-test='email-field']").type("wibrc@gmde");
      cy.get("[data-test='password-field']").type("wibr#4frf");

      cy.get("[data-test='submit-btn']").click();

      cy.get("[data-test='email-field'] [data-test='email-error']").should(
        "have.text",
        "Please use an email here"
      );
    });

    it("should display an error message when the password is less than 8 character", () => {
      cy.get("[data-test='email-field']").type("wibrc@gmde.dr");
      cy.get("[data-test='password-field']").type("wibrf");

      cy.get("[data-test='submit-btn']").click();

      cy.get("[data-test='password-field'] [data-test='password-error']").should(
        "have.text",
        "At least 8 characters"
      );
    });

    it("should display an error message when the user is not found", () => {
      cy.intercept(
        {
          method: "POST",
          url: "/api/v1/user/login",
        },
        {
          statusCode: 404,
          body: "USER-404",
        }
      );
      cy.get("[data-test='email-field']").type("wibrc@gm.fr");
      cy.get("[data-test='password-field']").type("wibr#4frf");

      cy.get("[data-test='submit-btn']").click();

      cy.get("[data-test='error-message']").should("have.text", "User not found");
    });
  });
});
