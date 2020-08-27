import React, { Component } from "react";
import PropTypes from "prop-types";
import "./SongList.css";
import "../../index.css";
import SongListItem from "./SongListItem/SongListItem";

export default class SongList extends Component {
  static propTypes = {};

  render() {
    const { data, onSongPlayRequest } = this.props;

    return (
      <div className="song-list-container">
        {data.map((songListItemData) => (
          <SongListItem
            data={songListItemData}
            onSongPlayRequest={onSongPlayRequest}
          />
        ))}
      </div>
    );
  }
}
