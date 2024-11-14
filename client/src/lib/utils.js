import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString) {
  const date = new Date(dateString);

  const month = new Intl.DateTimeFormat("en", { month: "long" }).format(date);
  const year = date.getFullYear();

  return `${month} ${year}`;
}

export function lastLogin(dateString) {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleString();

  return formattedDate;
}
