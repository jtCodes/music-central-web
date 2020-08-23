import React, { Component } from "react";
import PropTypes from "prop-types";
import "./AlbumList.css";
import AlbumListItem from "./AlbumListItem/AlbumListItem";

export default class AlbumList extends Component {
  static propTypes = {};

  render() {
    const { data, width } = this.props;
    return (
      <div className="album-list-container" style={{ width: width }}>
        {data.map((albumListItemData) => (
          <AlbumListItem data={albumListItemData} />
        ))}
      </div>
    );
  }
}
