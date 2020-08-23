import React, { Component } from "react";
import PropTypes from "prop-types";
import "./NowPlayingBottomBar.css";
import MediaControls from "../../MediaControls/MediaControls";

export default class NowPlayingBottomBar extends Component {
  static propTypes = {
    // prop: PropTypes
  };

  render() {
    return (
      <div className="now-playing-bottom-bar-container">
        <div className="now-playing-bottom-bar">
            {/* <MediaControls /> */}
        </div>
      </div>
    );
  }
}
