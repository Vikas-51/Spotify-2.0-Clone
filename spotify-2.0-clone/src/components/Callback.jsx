import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateProvider } from "../context/StateContext";
import { reducerCases } from "../utils/Constants";

export default function Callback() {
  const navigate = useNavigate();
  const [, dispatch] = useStateProvider();

  useEffect(() => {
    const getToken = async () => {
      const code = new URLSearchParams(window.location.search).get("code");
      const codeVerifier = sessionStorage.getItem("code_verifier");

      if (!code || !codeVerifier) return;

      const params = new URLSearchParams();
      params.append("client_id", "0de0d06ad9534e7a938e51b89296b1b9");
      params.append("grant_type", "authorization_code");
      params.append("code", code);
      params.append(
        "redirect_uri",
        "https://precious-gnome-0b4740.netlify.app/callback"
      );
      params.append("code_verifier", codeVerifier);

      try {
        const response = await axios.post(
          "https://accounts.spotify.com/api/token",
          params,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        dispatch({
          type: reducerCases.SET_TOKEN,
          token: response.data.access_token,
        });
        navigate("/");
      } catch (err) {
        console.error("Failed to exchange token:", err);
      }
    };

    getToken();
  }, [dispatch, navigate]);

  return <p>Logging in...</p>;
}
