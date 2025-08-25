import { clsx } from "clsx";

// Simple className utility function
export function cn(...inputs) {
  return clsx(inputs);
}

// Alternative without clsx dependency
export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}