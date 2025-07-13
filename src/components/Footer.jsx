import React from "react";
import CurrentTrack from "./CurrentTrack";
import PlayerControls from "./PlayerControls";
import Volume from "./Volume";

export default function Footer() {
  return (
    <div className="d-flex justify-content-between align-items-center px-3 py-2" style={{
      backgroundColor: "#181818",
      borderTop: "1px solid #282828",
      width: "100%",
    }}>
      <div className="flex-grow-1 d-flex align-items-center justify-content-start">
        <CurrentTrack />
      </div>
      <div className="flex-grow-2 d-flex align-items-center justify-content-center">
        <PlayerControls />
      </div>
      <div className="flex-grow-1 d-flex align-items-center justify-content-end">
        <Volume />
      </div>
    </div>
  );
}
