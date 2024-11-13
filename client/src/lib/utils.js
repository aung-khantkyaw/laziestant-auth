import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatJoinDate(dateString) {
  const date = new Date(dateString);

  // Format month name and year
  const month = new Intl.DateTimeFormat("en", { month: "long" }).format(date);
  const year = date.getFullYear();

  return `Joined ${month} ${year}`;
}
