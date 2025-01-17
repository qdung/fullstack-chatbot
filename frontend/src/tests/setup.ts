import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

console.log(process.cwd());

afterEach(() => {
  cleanup();
});
