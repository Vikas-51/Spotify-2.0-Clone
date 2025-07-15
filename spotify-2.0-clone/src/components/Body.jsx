import React, { useEffect } from "react";
import axios from "axios";
import { useStateProvider } from "../context/StateContext.js";
import { AiFillClockCircle } from "react-icons/ai";
import { reducerCases } from "../utils/Constants";

export default function Body({ headerBackground }) {
  const [{ token, selectedPlaylist, selectedPlaylistId }, dispatch] = useStateProvider();

  useEffect(() => {
    const getInitialPlaylist = async () => {
      console.log("Token:", token);
      console.log("Selected Playlist ID:", selectedPlaylistId);
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );

      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a") ? "" : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({ track }) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name).join(", "),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };

      dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
    };

    getInitialPlaylist();
  }, [token, dispatch, selectedPlaylistId]);

  const playTrack = async (id, name, artists, image, context_uri, track_number) => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri,
        offset: { position: track_number - 1 },
        position_ms: 0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );

    if (response.status === 204) {
      dispatch({
        type: reducerCases.SET_PLAYING,
        currentPlaying: { id, name, artists, image },
      });
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    } else {
      dispatch({ type: reducerCases.SET_PLAYER_STATE, playerState: true });
    }
  };

  const msToMinutesAndSeconds = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="container-fluid px-4 py-3">
      {selectedPlaylist && (
        <>
          <div className="d-flex align-items-center gap-4 mb-4">
            <div>
              <img
                src={selectedPlaylist.image}
                alt="Playlist"
                className="img-fluid shadow"
                style={{ height: "15rem" }}
              />
            </div>
            <div>
              <span className="text-muted">PLAYLIST</span>
              <h1 className="text-white display-4">{selectedPlaylist.name}</h1>
              <p className="text-light">{selectedPlaylist.description}</p>
            </div>
          </div>

          <div className="text-light mb-2 d-flex px-3 fw-bold sticky-top" style={{ backgroundColor: headerBackground ? "#000000dc" : "transparent" }}>
            <div className="flex-shrink-0" style={{ width: "40px" }}>#</div>
            <div className="flex-grow-1">TITLE</div>
            <div className="flex-grow-1">ALBUM</div>
            <div className="flex-shrink-0" style={{ width: "30px" }}>
              <AiFillClockCircle />
            </div>
          </div>

          <div>
            {selectedPlaylist.tracks.map((track, index) => (
              <div
                key={track.id}
                className="d-flex align-items-center px-3 py-2 track-row"
                onClick={() => playTrack(
                  track.id,
                  track.name,
                  track.artists,
                  track.image,
                  track.context_uri,
                  track.track_number
                )}
                style={{ cursor: "pointer" }}
              >
                <div className="flex-shrink-0" style={{ width: "40px" }}>
                  {index + 1}
                </div>
                <div className="d-flex align-items-center flex-grow-1 gap-3">
                  <img src={track.image} alt="track" height={40} width={40} />
                  <div>
                    <div className="fw-semibold text-white">{track.name}</div>
                    <div className="text-muted small">{track.artists}</div>
                  </div>
                </div>
                <div className="flex-grow-1 text-light">{track.album}</div>
                <div className="flex-shrink-0" style={{ width: "30px" }}>
                  <span className="text-light">{msToMinutesAndSeconds(track.duration)}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
