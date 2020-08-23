import React, { Component } from "react";
import PropTypes from "prop-types";
import "./AlbumListItem.css";

export default class AlbumListItem extends Component {
  static propTypes = {};

  render() {
    const { data } = this.props;

    return (
      <div className="album-list-item-container">
        <img
          className="album-list-item-album-art center-vertically"
          src={data.albumArt}
          alt="album art"
        />
        <div className="album-list-item-album-detail-container">
          <div className="album-list-item-album-name">{data.album}</div>
          {/* <div className="album-list-item-album-artist">{data.artist}</div> */}
          <div className="album-list-item-album-year-type">
            {data.type} • {data.releaseYear}
          </div>
        </div>
      </div>
    );
  }
}
