const isLocalhost = window.location.hostname === "localhost";

export const server = isLocalhost
  ? "http://localhost:8000/api/v2"
  : "https://mv-backend.vercel.app/api/v2";
