import React, { Component } from "react";
import ReactAudioPlayer from "react-audio-player";
import Sound from "react-sound";
import "./Slider.css";
import "./App.css";
import SoundManager from "./SoundManager";
import backgroundImage from "./img1.webp";
import BackgroundImage from "./BackgroundImage";
import MediaControls from "./MediaControls/MediaControls";
import LyricsDisplay from "./Lyrics/LyricsDisplay/LyricsDisplay";
import lyricsData from "./Lyrics/test.json";
import { FaEdit } from "react-icons/fa";
import LyricsEditor from "./Lyrics/LyricsEditor/LyricsEditor";
import localUrl from "./mercy.mp3";
import * as artistTestData from "./MusicBrowser/ArtistPage/TestData.js";
import ArtistPage from "./MusicBrowser/ArtistPage/ArtistPage";
import { FirebaseContext } from "./Firebase";

const url =
  "https://firebasestorage.googleapis.com/v0/b/music-central-dfb24.appspot.com/o/The%20World%20of%20Mercy.mp3?alt=media&token=d05fa80b-2547-4f87-9d82-6d00b5d7f3d5";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditingMode: false,
      playStatus: Sound.status.PAUSED,
      lastPlayedPos: 0,
      seekToPos: 0,
      currentSongUrl: undefined,
    };
    this.lastPlayedPostion = 0;
    this.currentSongUrl = undefined;
  }

  handleSongPlaying = (status) => {
    this.setState({ ...this.state, lastPlayedPos: status.position });
  };

  handleSoundLoaded = (songDetails) => {
    this.setState({
      songDurInMs: songDetails.duration,
    });
  };

  // TODO: refine handling of audio playing when editing mode is selected
  handleEditingButtonClick = () => {
    this.setState({
      ...this.state,
      isEditingMode: !this.state.isEditingMode,
      playStatus: this.state.isEditingMode
        ? Sound.status.PAUSED
        : Sound.status.PLAYING,
    });
  };

  handlePlayButtonClick = () => {
    let curPlayStatus = this.state.playStatus;
    let newPlayStatus =
      curPlayStatus === Sound.status.PLAYING
        ? Sound.status.PAUSED
        : Sound.status.PLAYING;

    this.setState({
      ...this.state,
      playStatus: newPlayStatus,
      seekToPos: this.state.lastPlayedPos,
    });

    // this.firebase.getSongLyrics("how you like that").once(
    //   "value",
    //   (snapshot) => {
    //     if (!this.currentSongUrl) {
    //       this.currentSongUrl = snapshot.val().url;
    //     }
    //   },
    //   (errorObject) => {
    //     console.log("The read failed: " + errorObject.code);
    //   }
    // );

    // this.lastPlayedPostion = this.state.lastPlayedPos
  };

  handleSliderChanging = (newValue) => {
    this.setState({
      ...this.state,
      lastPlayedPos: newValue,
      seekToPos: newValue,
    });
  };

  // handleSliderBeforeChange = () => {
  //   console.log(" fodsfjdsofdsjfdsjfdlskfjdslf sdfbefoer ejflkdsjfklds before")
  //   this.isSliderMouseDown = true;
  // };

  handleSliderChangeEnd = (endValue) => {
    this.setState({
      ...this.state,
      seekToPos: null,
    });
  };

  handleSongPlayRequest = (songId) => {
    this.firebase.getSongLyrics(songId).once(
      "value",
      (snapshot) => {
        if (snapshot.val().streamUrl !== this.state.currentSongUrl) {
          this.setState({
            ...this.state,
            currentSongUrl: snapshot.val().streamUrl,
            playStatus: Sound.status.PLAYING,
            lastPlayedPos: 0,
            seekToPos: 0,
          });
        } else {
          this.setState({
            ...this.state,
            playStatus: Sound.status.PLAYING,
          });
        }
      },
      (errorObject) => {
        console.log("The read failed: " + errorObject.code);
      }
    );
  };

  render() {
    const {
      playStatus,
      lastPlayedPos,
      songDurInMs,
      seekToPos,
      isEditingMode,
      currentSongUrl,
    } = this.state;
    return (
      <div className="music-central-app-container">
        {!this.firebase ? (
          <FirebaseContext.Consumer>
            {(firebase) => {
              this.firebase = firebase;
            }}
          </FirebaseContext.Consumer>
        ) : null}
        {/* <BackgroundImage backgroundImage={backgroundImage} /> */}
        <div className="music-central-app">
          <div
            className="lyrics-editing-btn"
            onClick={this.handleEditingButtonClick}
          >
            <FaEdit size={30} color={"white"} />
          </div>
          {isEditingMode ? (
            <div className="music-central-editor-container">
              <LyricsEditor url={localUrl} />
            </div>
          ) : (
            <>
              {/* <div className="music-central-album-art">
                <img
                  className="ms-box-shadow1"
                  src={backgroundImage}
                  alt="album art"
                  width="150"
                  height="150"
                />{" "}
              </div>
              <LyricsDisplay data={lyricsData} lastPlayedPos={lastPlayedPos} />
              <div className="ms-bottom ms-100vw">
                <div className="ms-center">
                  <MediaControls
                    isPlaying={playStatus === Sound.status.PLAYING}
                    lastPlayedPos={lastPlayedPos}
                    songDurInMs={songDurInMs}
                    handlePlayButtonClick={this.handlePlayButtonClick}
                    handleSliderChanging={this.handleSliderChanging}
                  />
                </div>
              </div> */}
              <ArtistPage
                data={artistTestData[window.location.pathname.split("/")[1]]}
                onSongPlayRequest={this.handleSongPlayRequest}
              />
              <div className="ms-bottom ms-100vw">
                <div className="ms-center">
                  <MediaControls
                    isPlaying={playStatus === Sound.status.PLAYING}
                    lastPlayedPos={lastPlayedPos}
                    songDurInMs={songDurInMs}
                    handlePlayButtonClick={this.handlePlayButtonClick}
                    handleSliderChanging={this.handleSliderChanging}
                  />
                </div>
              </div>
              <SoundManager
                url={currentSongUrl}
                playStatus={playStatus}
                playFromPosition={seekToPos}
                onLoading={this.handleSongLoading}
                onPlaying={this.handleSongPlaying}
                onFinishedPlaying={this.handleSongFinishedPlaying}
                onLoad={this.handleSoundLoaded}
              />
            </>
          )}
        </div>
      </div>
    );
  }
}

export default App;
