import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isActivePath(path: string, pathname: string): boolean {
  if (path === "/") return pathname === "/";
  return pathname.startsWith(path);
}

export function assertValue<T>(
  v: T | undefined,
  errorMessage?: string,
): NonNullable<T> {
  if (v === undefined || v === null) {
    throw new Error(errorMessage ?? "Missing property");
  }
  return v;
}

export function slugify(value: string) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/\//g, " ")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-\u0370-\u03FF]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}
