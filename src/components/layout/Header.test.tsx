import { describe, expect, mock, spyOn, test } from "bun:test";

import * as TanStackRouter from "@tanstack/react-router";
import { cleanup, render, screen } from "@testing-library/react";

// Spy on router hooks
spyOn(TanStackRouter, "useRouteContext").mockReturnValue({});
spyOn(TanStackRouter, "useRouter").mockReturnValue({
  invalidate: mock(),
} as unknown as ReturnType<typeof TanStackRouter.useRouter>);
spyOn(TanStackRouter, "useLocation").mockReturnValue({
  pathname: "/",
} as unknown as ReturnType<typeof TanStackRouter.useLocation>);

// Mock useTheme
mock.module("@/providers/ThemeProvider", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: mock(() => {}),
  }),
}));

// Mock InternalLink to avoid router dependency
mock.module("@/components/core/InternalLink", () => ({
  default: ({
    children,
    to,
    ...props
  }: {
    children: React.ReactNode;
    to: string;
  }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

// Import after mocking
const { default: Header } = await import("./Header");

const renderHeader = () => {
  cleanup();

  return render(<Header />);
};

describe("Header", () => {
  test("renders header element", () => {
    renderHeader();

    const header = screen.getByRole("banner");
    expect(header).toBeDefined();
  });

  test("renders pricing link", () => {
    renderHeader();

    const pricingLink = screen.getByRole("link", { name: "Pricing" });
    expect(pricingLink).toBeDefined();
  });
});
