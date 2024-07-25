import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type UserLocationType = {
  [username: string]: {username: string, lat: string, long: string, time: string, is_vpn: boolean, is_proxy: boolean}
}
