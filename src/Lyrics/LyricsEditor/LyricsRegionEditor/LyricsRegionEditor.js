import React, { Component } from "react";
import "./LyricsRegionEditor.css";

class LyricsRegionEditor extends Component {
  constructor(props) {
    super(props);
    this.lyricTextAreaRef = React.createRef();
    this.state = {};
  }

  handleSaveLyricRegionBtnClick = () => {
    this.props.onSaveLyricRegionBtnClick(this.lyricTextAreaRef.current.value);
  };

  handleRemoveLyricRegionBtnClick = () => {
    this.props.onRemoveLyricRegionBtnClick();
  };

  render() {
    return (
      <div className="lyrics-region-editor-container">
        <textarea
          ref={this.lyricTextAreaRef}
          // onChange={this.handleChange}
        />
        <div className="ms-row">
          <div
            className="lyric-region-save-btn"
            onClick={this.handleSaveLyricRegionBtnClick}
          />
          <div
            className="lyric-region-remove-btn"
            onClick={this.handleRemoveLyricRegionBtnClick}
          />
        </div>
      </div>
    );
  }
}

export default LyricsRegionEditor;
