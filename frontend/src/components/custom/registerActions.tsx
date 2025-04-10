"use server"

import { z } from "zod"

// Define the schema for validation
const userSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(8),
})

const baseURL = process.env.NEXT_PUBLIC_DOTNET_API_BASE_URL;

export async function registerUser(data: { username: string; password: string }) {
  // Validate the input data
  const validationResult = userSchema.safeParse(data)

  if (!validationResult.success) {
    return {
      success: false,
      error: "Invalid input data",
    }
  }

  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Ignore SSL verification

    // Call .NET Web API for user registration
    const response = await fetch(`${baseURL}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include"
    })

    // Parse the API response
    const result = await response.json()
    console.log(result);
    console.log(result.error);

    if (!response.ok) {
      return {
        success: false,
        error: result.error,
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error("Registration error:", error)
    return {
      success: false,
      error: "Failed to register user. Please try again.",
    }
  }
}

