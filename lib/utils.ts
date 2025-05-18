import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Generates a unique ID based on name and phone number
 * @param name User's full name
 * @param phone User's phone number
 * @returns A unique identifier string
 */
export function generateUniqueId(name: string, phone: string): string {
  // Remove spaces and convert to lowercase
  const cleanName = name.toLowerCase().replace(/\s+/g, "")

  // Take first 3 characters of name (or all if less than 3)
  const namePrefix = cleanName.substring(0, Math.min(3, cleanName.length))

  // Take last 4 digits of phone
  const phoneSuffix = phone.slice(-4)

  // Generate a random component (4 characters)
  const randomChars = Math.random().toString(36).substring(2, 6)

  // Create timestamp component (last 4 digits of current timestamp)
  const timestamp = Date.now().toString().slice(-4)

  // Combine all parts to create the unique ID
  return `${namePrefix}${phoneSuffix}-${randomChars}-${timestamp}`.toUpperCase()
}

/**
 * Saves the current logged-in user ID
 * @param userId The unique ID of the logged-in user
 */
export function setCurrentUser(userId: string): void {
  localStorage.setItem("doktrg_current_user", userId)
}

/**
 * Gets the current logged-in user ID
 * @returns The unique ID of the current user or null if no user is logged in
 */
export function getCurrentUser(): string | null {
  return localStorage.getItem("doktrg_current_user")
}

/**
 * Clears the current user session
 */
export function clearCurrentUser(): void {
  localStorage.removeItem("doktrg_current_user")
}

/**
 * Generates a user-specific storage key
 * @param baseKey The base storage key
 * @param userId Optional userId, if not provided current user will be used
 * @returns A user-specific storage key
 */
export function getUserStorageKey(baseKey: string, userId?: string): string {
  const userIdToUse = userId || getCurrentUser()
  if (!userIdToUse) {
    throw new Error("No user ID provided and no user is currently logged in")
  }
  return `doktrg_user_${userIdToUse}_${baseKey}`
}
