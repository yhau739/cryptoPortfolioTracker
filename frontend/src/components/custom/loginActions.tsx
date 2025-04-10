// "use server";

export async function loginUser(data: { username: string; password: string }) {
  const baseURL = process.env.NEXT_PUBLIC_DOTNET_API_BASE_URL;
  console.log("This is baseURL:" + baseURL);

  // try {
  if (process.env.NODE_ENV !== "production") {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }
  // Ignore SSL verification

  const response = await fetch(`${baseURL}/api/auth/login`, {
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
