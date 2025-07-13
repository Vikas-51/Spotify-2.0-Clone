import React, { useEffect, useRef, useState } from "react";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Navbar from "./Navbar";
import axios from "axios";
import { useStateProvider } from "../context/StateContext.js"; 
import Body from "./Body";
import { reducerCases } from "../utils/Constants";

export default function Spotify() {
  const [{ token }, dispatch] = useStateProvider();
  const [navBackground, setNavBackground] = useState(false);
  const [headerBackground, setHeaderBackground] = useState(false);
  const bodyRef = useRef();

  const bodyScrolled = () => {
    const scrollTop = bodyRef.current?.scrollTop || 0;
    setNavBackground(scrollTop >= 30);
    setHeaderBackground(scrollTop >= 268);
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const userInfo = {
        userId: data.id,
        userUrl: data.external_urls.spotify,
        name: data.display_name,
      };
      dispatch({ type: reducerCases.SET_USER, userInfo });
    };

    getUserInfo();
  }, [dispatch, token]);

  useEffect(() => {
    const getPlaybackState = async () => {
      const { data } = await axios.get("https://api.spotify.com/v1/me/player", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      dispatch({
        type: reducerCases.SET_PLAYER_STATE,
        playerState: data?.is_playing,
      });
    };

    getPlaybackState();
  }, [dispatch, token]);

  return (
    <div
      className="d-flex flex-column"
      style={{ maxWidth: "100vw", maxHeight: "100vh", overflow: "hidden" }}
    >
      <div className="d-flex flex-grow-1" style={{ height: "85vh" }}>
        <div style={{ width: "15vw", height: "100%", backgroundColor: "#000" }}>
          <Sidebar />
        </div>
        <div
          ref={bodyRef}
          onScroll={bodyScrolled}
          className="flex-grow-1 overflow-auto"
          style={{
            background: "linear-gradient(transparent, rgba(0,0,0,1))",
            backgroundColor: "rgb(32, 87, 100)",
          }}
        >
          <Navbar navBackground={navBackground} />
          <div>
            <Body headerBackground={headerBackground} />
          </div>
        </div>
      </div>
      <div className="bg-dark" style={{ height: "15vh" }}>
        <Footer />
      </div>
    </div>
  );
}
