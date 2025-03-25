"use server";

export async function loginUser(data: { username: string; password: string }) {
    // try {
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Ignore SSL verification
      const response = await fetch("https://localhost:7166/api/auth/login", {
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
      console.log(result.sessionId);
      // if (result.sessionId) {
      //   localStorage.setItem("sessionId", result.sessionId);
      // }

      return result; // Resolves with API response
  }
