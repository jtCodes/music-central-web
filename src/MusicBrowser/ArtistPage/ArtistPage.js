import React, { Component } from "react";
import PropTypes from "prop-types";
import "./ArtistPage.css";
import NavSideBar from "../NavSideBar/NavSideBar";
import SongList from "../SongList/SongList";
import { commonCase } from "../SongList/TestData.js";

let artistHeaderBackgroundUrl =
  "https://kpopping.com/uploads/documents/4e/3/kpics_gallery/x3-3,281,29.jpeg.keep.fff.png.pagespeed.ic.P-mBa33ujA.jpg";

export default class ArtistPage extends Component {
  static propTypes = {};

  render() {
    return (
      <div className="artist-page-wrapper">
        <header
          className="artist-page-main-head"
          style={{ backgroundImage: "url(" + artistHeaderBackgroundUrl + ")" }}
        ></header>
        <NavSideBar />
        <article className="artist-page-content">
          <section className="artist-page-top-songs-section">
            <div className="artist-page-section-title">Top Songs</div>
            <SongList data={commonCase} />
          </section>
        </article>
        <aside className="artist-page-side">
          <section className="artist-page-new-release-section">
            <div className="artist-page-section-title">New Release</div>
          </section>
        </aside>
        <div className="artist-page-ad"></div>
        <footer className="artist-page-main-footer"></footer>
      </div>
    );
  }
}
