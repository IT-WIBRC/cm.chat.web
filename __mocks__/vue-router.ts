import { vi } from "vitest";

export const useRouter = vi.fn(() => ({
  push: vi.fn(),
}));
