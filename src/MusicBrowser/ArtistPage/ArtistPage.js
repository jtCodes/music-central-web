import React, { Component } from "react";
import PropTypes from "prop-types";
import unescape from "unescape";
import ColorThief from "colorthief";
import { Palette } from "react-palette";
import colorAlpha from "color-alpha";
import "./ArtistPage.css";
import NavSideBar from "../NavSideBar/NavSideBar";
import SongList from "../SongList/SongList";
import { commonCase as songListTestData } from "../SongList/TestData.js";
import { commonCase as albumListTestData } from "../AlbumList/TestData.js";
import NowPlayingBottomBar from "../NowPlayingBottomBar/NowPlayingBottomBar";
import AlbumList from "../AlbumList/AlbumList";

let artistHeaderBackgroundUrl =
  "https://kpopping.com/uploads/documents/4e/3/kpics_gallery/x3-3,281,29.jpeg.keep.fff.png.pagespeed.ic.P-mBa33ujA.jpg";
//http://images6.fanpop.com/image/photos/43100000/IU-2020-Season-s-Greetings-POSTCARD-CALENDAR-iu-43191775-2300-3474.jpg
artistHeaderBackgroundUrl = "https://i.redd.it/wd3xrigeisc41.png";

// artistHeaderBackgroundUrl =
//   "https://kpopping.com/uploads/documents/60/5/kpics_gallery/x80103595_20200626005743_org.jpeg.keep.fff.png.pagespeed.ic.wsfj-rUsc5.webp";
export default class ArtistPage extends Component {
  constructor(props) {
    super(props);

    this.bannerTextBackgroundAlpha = 0.65;
    // Image element reference
    this.headerBackGroundImgRef = React.createRef();
  }

  render() {
    const { data } = this.props;
    const bannerTextBackgroundColor = colorAlpha(
      data.bannerColor,
      this.bannerTextBackgroundAlpha
    );

    return (
      <>
        <div
          className="artist-page-wrapper"
          style={{ backgroundColor: data.bannerColor, color: data.textColor }}
        >
          <header
            className="artist-page-main-head"
            style={{
              backgroundImage: "url(" + data.bannerUrl + ")",
            }}
          >
            <div
              className="artist-page-header-artist-name"
              style={{
                backgroundColor: bannerTextBackgroundColor,
                color: data.textColor,
              }}
            >
              {data.artist}
            </div>

            <div
              className="artist-page-header-artist-summary"
              style={{
                backgroundColor: bannerTextBackgroundColor,
                color: data.textColor,
              }}
            >
              {unescape(data.summary)}
            </div>
          </header>
          <NavSideBar />
          <article className="artist-page-content">
            <section className="artist-page-top-songs-section">
              <div className="artist-page-section-title">Top Songs</div>
              <SongList data={songListTestData[data.artistId]} />
            </section>
          </article>
          <aside className="artist-page-side">
            <section className="artist-page-new-release-section">
              <div className="artist-page-section-title artist-page-new-release-section-title">
                New Release
              </div>
              <AlbumList data={albumListTestData[data.artistId]} width={360} />
            </section>
          </aside>
          <div className="artist-page-ad"></div>
          <footer className="artist-page-main-footer"></footer>
        </div>
        <NowPlayingBottomBar />
      </>
    );
  }
}
