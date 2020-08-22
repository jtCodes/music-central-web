import React, { Component } from "react";
import "./LyricsDisplay.css";

class LyricsDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.lastLyricChunkIndex = 0;
    this.lastPlayedPos = 0;
  }

  componentDidUpdate() {}

  getCurLyricChunk(data, lastPlayedPos) {
    let curLyricChunkCandidate = data[this.lastLyricChunkIndex];
    console.log(this.lastLyricChunkIndex);
    // user skipped
    if (true) {
      console.log("haha", this.lastPlayedPos, lastPlayedPos);
      this.lastLyricChunkIndex = this.tryToFindCandidateIndex(
        data,
        lastPlayedPos
      );
      curLyricChunkCandidate = data[this.lastLyricChunkIndex];
    }

    if (curLyricChunkCandidate) {
      if (
        lastPlayedPos >= curLyricChunkCandidate.from &&
        lastPlayedPos <= curLyricChunkCandidate.to
      ) {
        this.lastPlayedPos = lastPlayedPos;
        return curLyricChunkCandidate.label;
      } else if (curLyricChunkCandidate.to < lastPlayedPos) {
        this.lastLyricChunkIndex += 1;
      }
    }

    return "♫";
  }

  tryToFindCandidateIndex(data, lastPlayedPos) {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if (lastPlayedPos >= element.from && lastPlayedPos <= element.to) {
        return index;
      }
    }

    return undefined;
  }

  render() {
    const { data, lastPlayedPos } = this.props;

    return (
      <div className="ms-center">
        <div className="lyrics-display-container">
          <div className="lyrics-chunk-container">
            {this.getCurLyricChunk(data, lastPlayedPos)}
          </div>
        </div>
      </div>
    );
  }
}

export default LyricsDisplay;
