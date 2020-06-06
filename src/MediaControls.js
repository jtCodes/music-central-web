import React, { Component } from "react";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { FaPause, FaPlay } from "react-icons/fa";
import "./MediaControls.css";

class MediaControls extends Component {
  render() {
    const {
      isPlaying,
      lastPlayedPos,
      songDurInMs,
      handleSliderChanging,
      handlePlayButtonClick,
    } = this.props;

    let songDurInSecs = Math.round(toSeconds(songDurInMs));
    let lastPlayedPosInSecs = Math.round(toSeconds(lastPlayedPos));
    let curPosTimeLabel = toHHMMSS(lastPlayedPosInSecs);
    let leftTimeLabel = toHHMMSS(songDurInSecs - lastPlayedPosInSecs);

    // curPosTimeLabel = lastPlayedPos;
    // leftTimeLabel = songDurInMs - lastPlayedPos;

    return (
      <div className="media-controls-container">
        <div className="media-controls-slider-container">
          <Slider
            min={0}
            max={songDurInMs}
            value={lastPlayedPos}
            onChange={handleSliderChanging}
          />
        </div>{" "}
        <div className="media-controls-bottom-row">
          <div className="media-controls-time-label">{curPosTimeLabel}</div>
          <div className="" style={{ marginBottom: 10, alignSelf: "center" }}>
            <div className="play-pause-btn" onClick={handlePlayButtonClick}>
              {isPlaying ? (
                <FaPause color={"white"} size={25} />
              ) : (
                <FaPlay color={"white"} size={25} />
              )}
            </div>
          </div>
          <div className="media-controls-time-label">-{leftTimeLabel}</div>
        </div>
      </div>
    );
  }
}

const toSeconds = (ms) => {
  return ms / 1000;
};

const toHHMMSS = (secs) => {
  var sec_num = parseInt(secs, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor(sec_num / 60) % 60;
  var seconds = sec_num % 60;

  return [hours, minutes, seconds]
    .map((v) => (v < 10 ? "0" + v : v))
    .filter((v, i) => v !== "00" || i > 0)
    .join(":");
};

export default MediaControls;
