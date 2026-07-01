import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn utility", () => {
  it("merges class names correctly", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden")).toBe("base");
  });

  it("resolves tailwind conflicts", () => {
    expect(cn("px-4", "px-6")).toBe("px-6");
  });

  it("handles empty input", () => {
    expect(cn()).toBe("");
  });

  it("handles undefined values", () => {
    expect(cn("text-lg", undefined)).toBe("text-lg");
  });
});
