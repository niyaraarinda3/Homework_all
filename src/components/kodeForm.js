import React from "react";
import "./kodeSong.css";
import "./kodeForm.css";
import Button from "@mui/material/Button";

export default function kodeForm({ track, selectedSong, songSelect }) {
  return (
    <div className="cards" key={track.id}>
      <div className="konten">
        <div className="kotak-img">
          {track.album.images.length ? (
            <img src={track.album.images[0].url} alt="" />
          ) : (
            <div>No Image </div>
          )}
        </div>

        <div className="kotak-main">
          <h3>
            {track.name.length > 30
              ? `${track.name.substring(0, 30)}..`
              : track.name}
          </h3>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <Button
        variant="contained"
        color="success"
        size="small"
        className={songSelect ? "" : ""}
        onClick={() => selectedSong(track)}
      >
        {!songSelect ? "Select" : "Deselect"}
      </Button>
    </div>
  );
}
