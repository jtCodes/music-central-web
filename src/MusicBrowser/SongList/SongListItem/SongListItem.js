import React, { Component } from "react";
import PropTypes from "prop-types";
import "./SongListItem.css";

export default class SongListItem extends Component {
  static propTypes = {};

  render() {
    const { data } = this.props;

    return (
      <div className="song-list-item-container">
        <div
          className="song-list-item-album-art-container center-vertically"
          onClick={() => this.props.onSongPlayRequest(data.name)}
        >
          <img
            className="song-list-item-album-art center-vertically"
            src={data.albumArt}
            alt="album art"
          />
        </div>
        <div className=" song-list-item-name-artist center-vertically truncated">
          <div className="song-list-item-name truncated">{data.name}</div>
          {/* <div className="song-list-item-artist">{data.artist}</div> */}
        </div>
        <div className=" song-list-item-album center-vertically">
          <div>{data.album}</div>
        </div>
        <div className="song-list-item-time center-vertically">
          <div>{data.timeDisplay}</div>
        </div>
      </div>
    );
  }
}
