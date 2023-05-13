import { vi } from "vitest";

export const useI18n = vi.fn(() => {
  return {
    t: (key: string) => key,
  };
});
