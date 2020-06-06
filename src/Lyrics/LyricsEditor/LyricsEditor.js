import React, { Component } from "react";
import WaveSurfer from "wavesurfer.js";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js";
import ClipLoader from "react-spinners/ClipLoader";
import CursorPlugin from "wavesurfer.js/dist/plugin/wavesurfer.cursor.min.js";
import "./LyricsEditor.css";

class LyricsEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isWaveFormReady: false,
    };

    this.onSpaceBarPress = this.onSpaceBarPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onSpaceBarPress, false);

    this.waveform = WaveSurfer.create({
      container: "#waveform",
      waveColor: "#82b3c9",
      progressColor: "#4ba3c7",
      responsive: true,
      cursorColor: 'white',
      plugins: [
        TimelinePlugin.create({
          container: "#wave-timeline",
          primaryFontColor: "white",
          secondaryFontColor: "white",
        }),
        CursorPlugin.create({
          showTime: true,
          opacity: 0.9,
          color: 'white',
          customShowTimeStyle: {
            "background-color": "#000",
            color: "#fff",
            padding: "2px",
            "font-size": "10px",
          },
        }),
      ],
    });

    this.waveform.load(this.props.url);
    this.waveform.on("ready", () => {
      this.setState({
        isWaveFormReady: true,
      });
    });
    this.waveform.on('seek', () => {
      console.log(this.waveform.getCurrentTime())
    })
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onSpaceBarPress, false);
  }

  onSpaceBarPress(event) {
    if (event.keyCode === 32) {
      this.waveform.isPlaying() ? this.waveform.pause() : this.waveform.play();
    }
  }

  render() {
    const { isWaveFormReady } = this.state;

    return (
      <div className="lyrcis-editor-container ms-100vw ms-100vh">
        <div className="lyrics-editor-waveform-container">
          {/* <div></div> */}
          <div style={{ alignSelf: "flex-end" }}>
            <div id="wave-timeline"></div>
            <div id="waveform"></div>
          </div>
        </div>
        {!isWaveFormReady ? (
          <ClipLoader
            size={150}
            color={"#baeabc"}
            loading={this.state.loading}
          />
        ) : null}
      </div>
    );
  }
}

export default LyricsEditor;
