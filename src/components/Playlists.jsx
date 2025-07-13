import axios from "axios";
import React, { useEffect } from "react";
import { reducerCases } from "../utils/Constants";
import { useStateProvider } from "../context/StateContext.js";

export default function Playlists() {
  const [{ token, playlists }, dispatch] = useStateProvider();

  useEffect(() => {
    const getPlaylistData = async () => {
      const response = await axios.get("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const { items } = response.data;
      const playlists = items.map(({ name, id }) => ({ name, id }));
      dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
    };

    getPlaylistData();
  }, [token, dispatch]);

  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
  };

  return (
    <div className="text-light px-3" style={{ height: "100%", overflow: "hidden" }}>
      <ul
        className="list-unstyled d-flex flex-column gap-2 pt-3"
        style={{
          maxHeight: "55vh",
          overflowY: "auto",
        }}
      >
        {playlists.map(({ name, id }) => (
          <li
            key={id}
            onClick={() => changeCurrentPlaylist(id)}
            className="hover-effect"
          >
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
