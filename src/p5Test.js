import React, { Component } from "react";
import Sketch from "./reactp5";
// import "p5/lib/addons/p5.sound";
import soundFile from "./Periphery - It's Only Smiles (Audio).mp3";
import "./App.css";
// import p5 from "p5";

export default class App extends Component {
  x = 50;
  y = 50;
  sketchX = window.innerWidth;
  sketchY = window.innerHeight;
  size = 1000;
  randomSize = 0;
  ellipseColor = null;
  sound = null;

  constructor(props) {
    super(props);

    this.state = { isPlaying: false };

    this.ellipseWidth = 0;
  }

  preload = (p) => {
    this.sound = p.loadSound(soundFile, this.loaded);
  };

  setup = (p, canvasParentRef) => {
    // this.sound = p.loadSound(soundFile, this.loaded);
    this.randomSize = p.random(this.size / 6, this.size / 2);
    this.ellipseColor = p.color(
      p.random(0, 255),
      p.random(0, 255),
      p.random(0, 255)
    );

    p.createCanvas(this.sketchX, this.sketchY).parent(canvasParentRef);
    p.background("#FFFFFF");

    this.fft = new window.p5.FFT();
    this.amp = new window.p5.Amplitude();
    this.peakDetect = new window.p5.PeakDetect();
    this.peakDetect.onPeak(() => {
      const bins = ["bass", "lowMid", "mid", "highMid", "treble"];
      let mostEnergeticBin = "";
      let mostEnergeticLevel = -1;
      bins.forEach((bin) => {
        const energyLevel = this.fft.getEnergy(bin);
        if (energyLevel > mostEnergeticLevel) {
          mostEnergeticLevel = energyLevel;
          mostEnergeticBin = bin;
        }
        // console.log(`${bin} ${this.fft.getEnergy(bin)}`);
      });

      if (mostEnergeticBin !== "mid") {
        this.ellipseWidth = 200;
      }

      console.log(`${mostEnergeticBin} ${mostEnergeticLevel}`);
      console.log();
    });
  };

  draw = (p) => {
    this.ellipseWidth *= 0.95;
    p.background(90, 90, 90);
    p.translate(this.sketchX / 2, this.sketchY / 2);
    p.noStroke();
    p.fill(this.ellipseColor);
    p.ellipse(0, 0, this.ellipseWidth, this.ellipseWidth);
    p.text(this.sound.currentTime(), 10, 30);

    this.fft.analyze();
    this.peakDetect.update(this.fft);
  };

  loaded = () => {
    this.sound.jump(50);
    console.log(this.sound.duration(), this.sound.currentTime());
  };

  handleClick = () => {
    console.log(this.sound.currentTime());
    if (this.sound.isPlaying()) {
      this.sound.pause();
    } else {
      this.sound.play();
      // this.sound.jump(50)
    }
    this.setState({
      ...this.state,
      isPlaying: !this.state.isPlaying,
    });
  };

  render() {
    return (
      <>
        <div style={{ width: 50, height: 50, backgroundColor: "red" }}></div>
        <Sketch
          preload={this.preload}
          setup={this.setup}
          draw={this.draw}
          mousePressed={this.handleClick}
        />
      </>
    );
  }
}

function logAllProperties(obj) {
  if (obj == null) return; // recursive approach
  console.log(Object.getOwnPropertyNames(obj));
  logAllProperties(Object.getPrototypeOf(obj));
}
