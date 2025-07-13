import React from "react";
import { useStateProvider } from "../context/StateContext.js";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

export default function Navbar({ navBackground }) {
  const [{ userInfo }] = useStateProvider();

  return (
    <div
      className="d-flex justify-content-between align-items-center px-4"
      style={{
        paddingTop: "2rem",
        paddingBottom: "2rem",
        height: "15vh",
        position: "sticky",
        top: 0,
        zIndex: 100,
        transition: "0.3s ease-in-out",
        backgroundColor: navBackground ? "rgba(0,0,0,0.7)" : "transparent",
      }}
    >
      <div
        className="d-flex align-items-center gap-2 px-3 py-1"
        style={{
          backgroundColor: "white",
          borderRadius: "2rem",
          width: "30%",
        }}
      >
        <FaSearch />
        <input
          type="text"
          placeholder="Artists, songs, or podcasts"
          className="form-control border-0 p-0"
          style={{
            height: "2rem",
            boxShadow: "none",
          }}
        />
      </div>

      <div
        className="d-flex align-items-center"
        style={{
          backgroundColor: "black",
          padding: "0.3rem 1rem",
          borderRadius: "2rem",
        }}
      >
        <a
          href={userInfo?.userUrl}
          className="d-flex align-items-center gap-2 text-decoration-none fw-bold text-white"
        >
          <CgProfile
            style={{
              fontSize: "1.3rem",
              backgroundColor: "#282828",
              padding: "0.2rem",
              borderRadius: "1rem",
              color: "#c7c5c5",
            }}
          />
          <span>{userInfo?.name}</span>
        </a>
      </div>
    </div>
  );
}
