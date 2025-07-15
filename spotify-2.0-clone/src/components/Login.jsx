// import React from "react";

// export default function Login() {
//   const handleClick = () => {
//   const client_id = "0de0d06ad9534e7a938e51b89296b1b9";
//   const redirect_uri = "https://precious-gnome-0b4740.netlify.app/";
//   const api_uri = "https://accounts.spotify.com/authorize";
//   const scope = [
//     "user-read-private",
//     "user-read-email",
//     "user-modify-playback-state",
//     "user-read-playback-state",
//     "user-read-currently-playing",
//     "user-read-recently-played",
//     "user-top-read",
//     "playlist-read-private",
//   ];

//   // const authURL = `${api_uri}?client_id=${client_id}&redirect_uri=${encodeURIComponent(
//   //   redirect_uri
//   // )}&scope=${encodeURIComponent(scope.join(" "))}&response_type=token&show_dialog=true`;

//   const authURL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(
//     redirectUri
//   )}&scope=${scopes.join("%20")}`;

//   window.location.href = authURL;
// };


//   return (
//     <div
//       className="d-flex flex-column justify-content-center align-items-center gap-5 vh-100 vw-100"
//       style={{ backgroundColor: "#1db954" }}
//     >
//       <img
//         src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Black.png"
//         alt="spotify"
//         style={{ height: "20vh" }}
//       />
//       <button
//         onClick={handleClick}
//         className="btn"
//         style={{
//           padding: "1rem 5rem",
//           borderRadius: "5rem",
//           backgroundColor: "black",
//           color: "#49f585",
//           fontSize: "1.4rem",
//           border: "none",
//         }}
//       >
//         Connect Spotify
//       </button>
//     </div>
//   );
// }


import React from "react";
import { generateCodeChallenge, generateRandomString } from "../utils/pkceUtils";

export default function Login() {
  const clientId = "0de0d06ad9534e7a938e51b89296b1b9";
  const redirectUri = "https://precious-gnome-0b4740.netlify.app/callback";
  const scopes = [
    "user-read-email",
    "user-read-private",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-read-playback-state",
    "user-modify-playback-state",
    "user-read-currently-playing",
  ];

  const handleLogin = async () => {
    const codeVerifier = generateRandomString();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    sessionStorage.setItem("code_verifier", codeVerifier);

    const loginUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(
      scopes.join(" ")
    )}&code_challenge_method=S256&code_challenge=${codeChallenge}`;

    window.location.href = loginUrl;
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
      <h1 className="mb-4">Spotify Clone</h1>
      <button className="btn btn-success" onClick={handleLogin}>
        Login with Spotify
      </button>
    </div>
  );
}

