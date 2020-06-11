import React, { Component } from "react";
import WaveSurfer from "wavesurfer.js";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js";
import RegionPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min.js";
import ClipLoader from "react-spinners/ClipLoader";
import CursorPlugin from "wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js";
import "./LyricsEditor.css";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { FaSave } from "react-icons/fa";
import { FirebaseContext } from "../../Firebase";
import LyricsRegionEditor from "./LyricsRegionEditor/LyricsRegionEditor";

class LyricsEditor extends Component {
  constructor(props) {
    super(props);

    this.lyricTextAreaRef = React.createRef();

    this.state = {
      isWaveFormReady: false,
      isAddLyricMode: false,
      currentRegionLyric: "",
      curZoomValue: 0,
      songDuration: null,
      editorState: EditorState.createEmpty(),
    };

    this.sliderMin = null;

    this.onKeyDown = this.onKeyDown.bind(this);

    this.onChange = (editorState) =>
      this.setState({ ...this.state, editorState });
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyDown, false);

    this.waveform = WaveSurfer.create({
      container: "#waveform",
      waveColor: "#66bb6a",
      progressColor: "#66bb6a",
      responsive: true,
      cursorColor: "#ffc400",
      partialRender: true,
      plugins: [
        TimelinePlugin.create({
          container: "#wave-timeline",
          primaryFontColor: "white",
          secondaryFontColor: "white",
        }),
        CursorPlugin.create({
          showTime: true,
          opacity: 0.9,
          color: "#ff6659",
          customShowTimeStyle: {
            "background-color": "#000",
            color: "#fff",
            padding: "2px",
            "font-size": "12px",
          },
        }),
        RegionPlugin.create({
          regions: [],
          dragSelection: {
            slop: 5,
          },
          enableDragSelection: {
            color: "hsla(400, 100%, 30%, 0.5)",
          },
        }),
      ],
    });

    this.firebase.getSongLyrics("the world of mercy").once(
      "value",
      (snapshot) => {
        console.log(snapshot.val());
        this.loadRegions(JSON.parse(snapshot.val().lyrics));
      },
      (errorObject) => {
        console.log("The read failed: " + errorObject.code);
      }
    );
    // if (localStorage.regions) {
    //   this.loadRegions(JSON.parse(localStorage.regions));
    // }

    this.waveform.load(this.props.url);
    this.waveform.on("ready", () => {
      this.sliderMin = this.waveform.params.minPxPerSec;
      this.setState({
        isWaveFormReady: true,
        songDuration: this.waveform.getDuration(),
      });
    });
    this.waveform.on("seek", () => {});
    this.waveform.on("region-click", (regionObj) => {
      this.waveform.pause();
      this.setState({ ...this.state, isAddLyricMode: true });
      this.editingRegion = regionObj;
      console.log(regionObj);
      // regionObj.update({
      //   data: {
      //     note: "lol",
      //   },
      // });
    });
    this.waveform.on("region-update-end", (regionObj) => {
      console.log(regionObj);
    });

    this.waveform.on("region-in", (regionObj) => {
      this.setState({ ...this.state, currentRegionLyric: regionObj.data.note });
      console.log(regionObj.data.note);
    });

    this.waveform.on("region-out", (regionObj) => {
      this.setState({ ...this.state, currentRegionLyric: " " });
    });
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeyDown, false);
  }

  onKeyDown(event) {
    if (event.keyCode === 32) {
      this.waveform.isPlaying() ? this.waveform.pause() : this.waveform.play();
    } else if (event.keyCode === 84) {
      console.log(this.waveform.getCurrentTime());
    }
  }

  /**
   * Save annotations to localStorage.
   */
  saveRegions = () => {
    const stringifiedLyricsData = JSON.stringify(
      Object.keys(this.waveform.regions.list).map((id) => {
        const region = this.waveform.regions.list[id];
        return {
          start: region.start,
          end: region.end,
          attributes: region.attributes,
          data: region.data,
        };
      })
    );

    this.firebase.setSongLyrics("the world of mercy", stringifiedLyricsData);

    localStorage.regions = stringifiedLyricsData;
  };

  loadRegions(regions) {
    regions.forEach((region) => {
      this.waveform.addRegion(region);
    });
  }

  onSaveLyricRegionBtnClick = (value) => {
    this.setState({ ...this.state, isAddLyricMode: false });
    if (value) {
      this.editingRegion.update({
        data: {
          note: value,
        },
      });
      this.saveRegions();
    }

    this.editingRegion = null;
  };

  onRemoveLyricRegionBtnClick = (event) => {
    this.setState({ ...this.state, isAddLyricMode: false });
    if (this.editingRegion.id) {
      this.waveform.regions.list[this.editingRegion.id].remove();
    }
    this.saveRegions();
    this.editingRegion = null;
  };

  handleSliderChanging = (newValue) => {
    this.setState({ ...this.state, curZoomValue: newValue });
    this.waveform.zoom(Number(newValue));
    console.log(newValue);
  };

  handleSaveAllRegionsBtnClick = () => {
    console.log("haha");
    this.saveRegions();
  };

  render() {
    const {
      isWaveFormReady,
      isAddLyricMode,
      currentRegionLyric,
      songDuration,
      curZoomValue,
    } = this.state;

    return (
      <div className="lyrcis-editor-container ms-100vw ms-100vh">
        {!this.firebase ? (
          <FirebaseContext.Consumer>
            {(firebase) => {
              this.firebase = firebase;
            }}
          </FirebaseContext.Consumer>
        ) : null}
        <div
          className="save-regions-btn"
          onClick={this.handleSaveAllRegionsBtnClick}
        >
          <FaSave size={30} color={"white"} />
        </div>

        <div className="ms-row">
          <div className="lyrics-text-editor">
            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
            />
          </div>
          <div className="ms-col">
            {isAddLyricMode ? (
              <div className="lyrics-region-editing-section">
                <LyricsRegionEditor
                  onRemoveLyricRegionBtnClick={this.onRemoveLyricRegionBtnClick}
                  onSaveLyricRegionBtnClick={this.onSaveLyricRegionBtnClick}
                />
              </div>
            ) : null}
            <div className="current-lyric-chunk">{currentRegionLyric}</div>
          </div>
        </div>

        <div className="lyrics-editor-waveform-container">
          {!isWaveFormReady ? (
            <ClipLoader
              size={150}
              color={"#baeabc"}
              loading={this.state.loading}
            />
          ) : null}
          <div className="media-controls-slider-container">
            <Slider
              min={0}
              max={50}
              value={curZoomValue}
              onChange={this.handleSliderChanging}
            />
          </div>{" "}
          <div id="wave-timeline"></div>
          <div id="waveform"></div>
        </div>
      </div>
    );
  }
}

export default LyricsEditor;
