import React from "react";
import { MdHomeFilled, MdSearch } from "react-icons/md";
import { IoLibrary } from "react-icons/io5";
import Playlists from "./Playlists";

export default function Sidebar() {
  return (
    <div
      className="d-flex flex-column text-light"
      style={{ backgroundColor: "black", height: "100%", width: "100%" }}
    >
      <div className="d-flex flex-column">
        <div className="text-center my-3">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
            alt="spotify"
            style={{ maxWidth: "80%", height: "auto" }}
          />
        </div>
        <ul className="list-unstyled d-flex flex-column gap-3 px-3">
          <li className="d-flex gap-2 align-items-center hover-effect">
            <MdHomeFilled />
            <span>Home</span>
            
          </li>
          <li className="d-flex gap-2 align-items-center hover-effect">
            <MdSearch />
            <span>Search</span>
          </li>
          <li className="d-flex gap-2 align-items-center hover-effect">
            <IoLibrary />
            <span>Your Librarytt</span>
          </li>
        </ul>
      </div>
      <Playlists />
    </div>
  );
}
