import React from "react";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
import { useStateProvider } from "../context/StateContext.js";
import axios from "axios";
import { reducerCases } from "../utils/Constants";

export default function PlayerControls() {
  const [{ token, playerState }, dispatch] = useStateProvider();

  const changeState = async () => {
    const state = playerState ? "pause" : "play";
    await axios.put(
      `https://api.spotify.com/v1/me/player/${state}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({
      type: reducerCases.SET_PLAYER_STATE,
      playerState: !playerState,
    });
  };

  const changeTrack = async (type) => {
    await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });

    const response1 = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response1.data !== "") {
      const currentPlaying = {
        id: response1.data.item.id,
        name: response1.data.item.name,
        artists: response1.data.item.artists.map((artist) => artist.name),
        image: response1.data.item.album.images[2].url,
      };
      dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
    } else {
      dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
    }
  };

  const iconStyle = {
    color: "#b3b3b3",
    transition: "0.2s ease-in-out",
    cursor: "pointer",
  };

  const activeIconStyle = {
    ...iconStyle,
    color: "white",
  };

  return (
    <div className="d-flex align-items-center justify-content-center gap-4">
      <BsShuffle style={iconStyle} />
      <CgPlayTrackPrev style={{ ...iconStyle, fontSize: "2rem" }} onClick={() => changeTrack("previous")} />
      <div className="mx-2" style={{ fontSize: "2rem" }}>
        {playerState ? (
          <BsFillPauseCircleFill style={activeIconStyle} onClick={changeState} />
        ) : (
          <BsFillPlayCircleFill style={activeIconStyle} onClick={changeState} />
        )}
      </div>
      <CgPlayTrackNext style={{ ...iconStyle, fontSize: "2rem" }} onClick={() => changeTrack("next")} />
      <FiRepeat style={iconStyle} />
    </div>
  );
}
