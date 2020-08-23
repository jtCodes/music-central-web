import React, { Component } from "react";
import PropTypes from "prop-types";
import ColorThief from "colorthief";
import { Palette } from "react-palette";
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
// artistHeaderBackgroundUrl =
//   "https://i.redd.it/wd3xrigeisc41.png";
export default class ArtistPage extends Component {
  constructor(props) {
    super(props);

    // Image element reference
    this.headerBackGroundImgRef = React.createRef();
  }

  render() {
    return (
      <>
        <div className="artist-page-wrapper">
          <header
            className="artist-page-main-head"
            style={{
              backgroundImage: "url(" + artistHeaderBackgroundUrl + ")",
            }}
          >
            <div className="artist-page-header-artist-name">IU</div>

            <div className="artist-page-header-artist-summary" style={{}}>
              IU (아이유) is a South Korean singer-songwriter and actress
              currently under EDAM Entertainment. She debuted on September 18,
              2008 with a stage on M Countdown for the song "Lost Child". Her
              stage name is derived from the phrase "I and You", symbolizing
              that people can become one through music.
            </div>
          </header>
          <NavSideBar />
          <article className="artist-page-content">
            <section className="artist-page-top-songs-section">
              <div className="artist-page-section-title">Top Songs</div>
              <SongList data={songListTestData} />
            </section>
          </article>
          <aside className="artist-page-side">
            <section className="artist-page-new-release-section">
              <div className="artist-page-section-title artist-page-new-release-section-title">
                New Release
              </div>
              <AlbumList data={albumListTestData} width={360} />
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
