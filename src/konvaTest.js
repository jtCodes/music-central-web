import React, { Component } from "react";
import PropTypes from "prop-types";
import Konva from "konva";
import { Stage, Layer, Rect, Text, Circle, Line } from "react-konva";
import soundFile from "./Periphery - It's Only Smiles (Audio).mp3";

export default class App extends Component {
  static propTypes = {
    prop: PropTypes,
  };

  constructor(props) {
    super(props);
    this.state = { isPlaying: false };

    this.audioObject = null;
    this.audioContext = null;
    this.analyzerData = null;
  }

  componentDidMount() {
    this.initializeAudioAnalyzer(soundFile);
    this.runSpectrum();
    // this.play();
  }

  initializeAudioAnalyzer(soundFile) {
    this.audioObject = new Audio();
    this.audioContext = new AudioContext();
    const source = this.audioContext.createMediaElementSource(this.audioObject);
    const analyzer = this.audioContext.createAnalyser();
    this.audioObject.src = soundFile;
    analyzer.fftSize = 32;
    source.connect(this.audioContext.destination);
    source.connect(analyzer);
    // audioFile.play();
    this.analyzerData = analyzer;

    this.fft = new window.p5.FFT();
    this.amp = new window.p5.Amplitude();
    // this.peakDetect = new window.p5.PeakDetect();
  }

  play() {
    this.audioObject.play();
  }

  pause() {
    this.audioObject.pause();
  }

  runSpectrum = () => {
    this.getFrequencyData();
    requestAnimationFrame(this.runSpectrum);
  };

  getFrequencyData = (styleAdjuster) => {
    if (this.analyzerData && this.state.isPlaying) {
      const bufferLength = this.analyzerData.frequencyBinCount;
      console.log(bufferLength);
      const amplitudeArray = new Uint8Array(bufferLength);
      this.analyzerData.getByteFrequencyData(amplitudeArray);

      this.setState({
        ...this.state,
        amplitudeArray: amplitudeArray,
      });
      // styleAdjuster(amplitudeArray);
    }
  };

  drawBars(amplitudeArray, stageHeight) {
    const BAR_WIDTH = 20;
    const amplitudeArrayLen = amplitudeArray.length;

    this.fft.analyze();
    this.peakDetect.update(this.fft);
    this.peakDetect.onPeak(() => console.log("peak"), 1);

    return (
      <>
        {amplitudeArray.map((curFreqAmp, i) => {
          const fillColor =
            curFreqAmp > 0 && i >= amplitudeArrayLen * 0.7 ? "orange" : "red";
          return (
            <Rect
              x={i * BAR_WIDTH * 1.2}
              y={0}
              width={BAR_WIDTH}
              height={Number(curFreqAmp)}
              fill={fillColor}
              shadowBlur={2}
            />
          );
        })}
      </>
    );
  }

  handleClick = () => {
    if (this.state.isPlaying) {
      this.pause();
    } else {
      this.play();
    }

    this.setState({
      ...this.state,
      isPlaying: !this.state.isPlaying,
    });
  };

  render() {
    const { amplitudeArray, isPlaying } = this.state;

    if (amplitudeArray !== undefined) {
      const amplitudeArrayCopy = [...amplitudeArray];
      return (
        <div onClick={this.handleClick}>
          <Stage width={1900} height={1000}>
            <Layer>
              <Circle
                x={1900 / 2}
                y={1000 / 2}
                radius={amplitudeArrayCopy[13] > 0 ? 1900 : 0}
                fill="red"
              />
              {this.drawBars(amplitudeArrayCopy)}
              <Circle
                x={300}
                y={1000 / 2}
                radius={amplitudeArrayCopy[3]}
                fill="green"
              />
              <Circle
                x={600}
                y={1000 / 2}
                radius={amplitudeArrayCopy[5]}
                fill="purple"
              />
              <Circle
                x={900}
                y={1000 / 2}
                radius={amplitudeArrayCopy[10]}
                fill="orange"
              />
              <Circle
                x={1200}
                y={1000 / 2}
                radius={amplitudeArrayCopy[11]}
                fill="yellow"
              />
            </Layer>
          </Stage>
        </div>
      );
    }

    return <div onClick={this.handleClick}>haha</div>;
  }
}
