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
    };
    this.lastPlayedPostion = 0;
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

  render() {
    const {
      playStatus,
      lastPlayedPos,
      songDurInMs,
      seekToPos,
      isEditingMode,
    } = this.state;
    return (
      <div className="music-central-app-container">
        <BackgroundImage backgroundImage={backgroundImage} />
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
            <div className="music-central-player">
              <div className="music-central-album-art">
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
              </div>
              <SoundManager
                url={localUrl}
                playStatus={playStatus}
                playFromPosition={seekToPos}
                onLoading={this.handleSongLoading}
                onPlaying={this.handleSongPlaying}
                onFinishedPlaying={this.handleSongFinishedPlaying}
                onLoad={this.handleSoundLoaded}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
