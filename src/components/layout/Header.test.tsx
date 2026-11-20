import { describe, expect, mock, test } from "bun:test";

import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRouter,
} from "@tanstack/react-router";
import { cleanup, render, screen, waitFor } from "@testing-library/react";

// Mock useTheme
mock.module("@/providers/ThemeProvider", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: mock(() => {}),
  }),
}));

// Import after mocking
const { default: Header } = await import("./Header");

/**
 * Render the header inside a real in-memory router. Test files share one
 * process, so spying on router hooks or mocking link modules here would leak
 * into files that run later (e.g. `InternalLink.test.tsx`).
 */
const renderHeader = async () => {
  cleanup();

  const router = createRouter({
    routeTree: createRootRoute({ component: Header }),
    history: createMemoryHistory({ initialEntries: ["/"] }),
  });

  render(<RouterProvider router={router} />);

  await waitFor(() => {
    expect(screen.getByRole("banner")).toBeDefined();
  });
};

describe("Header", () => {
  test("renders header element", async () => {
    await renderHeader();

    expect(screen.getByRole("banner")).toBeDefined();
  });

  test("renders docs link", async () => {
    await renderHeader();

    expect(screen.getByRole("link", { name: "Docs" })).toBeDefined();
  });
});
