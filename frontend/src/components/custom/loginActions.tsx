"use server";

export async function loginUser(data: { username: string; password: string }) {
    // try {
      const response = await fetch("http://localhost:5053/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include"
      });

      const result = await response.json();
      // just to verify the response
      console.log(result);
      console.log(result.error);

      return result; // Resolves with API response
  }
