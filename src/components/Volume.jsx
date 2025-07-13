import axios from "axios";
import React from "react";
import { useStateProvider } from "../context/StateContext.js";

export default function Volume() {
  const [{ token }] = useStateProvider();

  const setVolume = async (e) => {
    await axios.put(
      "https://api.spotify.com/v1/me/player/volume",
      {},
      {
        params: {
          volume_percent: parseInt(e.target.value),
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
  };

  return (
    <div className="d-flex justify-content-end align-items-center">
      <input
        type="range"
        onMouseUp={setVolume}
        min={0}
        max={100}
        className="form-range"
        style={{ width: "15rem", height: "0.5rem", borderRadius: "2rem" }}
      />
    </div>
  );
}
