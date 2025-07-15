import React, { useEffect } from "react";
import axios from "axios";
import { useStateProvider } from "../context/StateContext.js";
import { reducerCases } from "../utils/Constants";

export default function CurrentTrack() {
  const [{ token, currentPlaying }, dispatch] = useStateProvider();

  useEffect(() => {
    const getCurrentTrack = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (response.data !== "") {
        const currentPlaying = {
          id: response.data.item.id,
          name: response.data.item.name,
          artists: response.data.item.artists.map((artist) => artist.name),
          image: response.data.item.album.images[2].url,
        };
        dispatch({ type: reducerCases.SET_PLAYING, currentPlaying });
      } else {
        dispatch({ type: reducerCases.SET_PLAYING, currentPlaying: null });
      }
    };

    getCurrentTrack();
  }, [token, dispatch]);

  return (
    <div className="px-3">
      {currentPlaying && (
        <div className="d-flex align-items-center gap-3">
          <div>
            <img
              src={currentPlaying.image}
              alt="Now Playing"
              height="50"
              width="50"
              className="rounded"
            />
          </div>
          <div className="d-flex flex-column">
            <h6 className="text-white mb-0">{currentPlaying.name}</h6>
            <small className="text-muted">
              {currentPlaying.artists.join(", ")}
            </small>
          </div>
        </div>
      )}
    </div>
  );
}
