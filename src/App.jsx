// import React, { useEffect } from "react";
// import Login from "./components/Login";
// import Spotify from "./components/Spotify";
// import { reducerCases } from "./utils/Constants";
// import { useStateProvider } from "./context/StateContext"; // ✅ updated path

// export default function App() {
//   const [{ token }, dispatch] = useStateProvider();

//   useEffect(() => {
//     const hash = window.location.hash;
//     let _token = localStorage.getItem("spotify_token");

//     if (hash && !_token) {
//       _token = hash.substring(1).split("&")[0].split("=")[1];
//       localStorage.setItem("spotify_token", _token);
//       window.location.hash = ""; // clean up the URL
//     }

//     if (_token) {
//       dispatch({ type: reducerCases.SET_TOKEN, token: _token });
//     }

//     document.title = "Spotify Clone";
//   }, [dispatch]);

//   return (
//     <div className="container-fluid p-3">
//       {token ? <Spotify /> : <Login />}
//     </div>
//   );
// }


import React, { useEffect } from "react";
import Login from "./components/Login";
import Spotify from "./components/Spotify";
import { reducerCases } from "./utils/Constants";
import { useStateProvider } from "./context/StateContext";

export default function App() {
  const [{ token }, dispatch] = useStateProvider();

  useEffect(() => {
    const hash = window.location.hash;
    const tokenFromURL = hash
      ?.substring(1)
      ?.split("&")
      ?.find((param) => param.startsWith("access_token="))
      ?.split("=")[1];

    if (tokenFromURL) {
      dispatch({ type: reducerCases.SET_TOKEN, token: tokenFromURL });
      window.location.hash = ""; // remove token from URL
    }
  }, [dispatch]);

  return (
    <div className="container-fluid p-3">{token ? <Spotify /> : <Login />}</div>
  );
}


