import { clsx } from "clsx";
import { generate } from "referral-codes";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function generateInviteCode(length) {
  const inviteCode = generate({
    length: length,
    count: 1,
  })
  return inviteCode[0];
}