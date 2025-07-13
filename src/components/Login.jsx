import React from "react";

export default function Login() {
  const handleClick = () => {
    const client_id = "0de0d06ad9534e7a938e51b89296b1b9";
    const redirect_uri = "https://precious-gnome-0b4740.netlify.app/";
    const authEndpoint = "https://accounts.spotify.com/authorize";
    const scopes = [
      "user-read-private",
      "user-read-email",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-top-read",
    ];

    const authURL = `${authEndpoint}?client_id=${client_id}&redirect_uri=${encodeURIComponent(
      redirect_uri
    )}&scope=${encodeURIComponent(scopes.join(" "))}&response_type=token&show_dialog=true`;

    console.log("Spotify Auth URL:", authURL);
    window.location.href = authURL;
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#1db954",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "5rem",
      }}
    >
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Black.png"
        alt="spotify"
        style={{ height: "20vh" }}
      />
      <button
        onClick={handleClick}
        style={{
          padding: "1rem 5rem",
          borderRadius: "5rem",
          backgroundColor: "black",
          color: "#49f585",
          border: "none",
          fontSize: "1.4rem",
          cursor: "pointer",
        }}
      >
        Connect Spotify
      </button>
    </div>
  );
}
