import React, { PureComponent } from "react";
import Sound from "react-sound";

// wrapper over Sound to prevent unncessary rendering

class SoundManager extends PureComponent {
  render() {
    const {
      playFromPosition,
      playStatus,
      url,
      onPlaying,
      onLoading,
      onFinishedPlaying,
      onLoad,
    } = this.props;

    console.log('render', playFromPosition)

    return (
      <Sound
        autoLoad
        url={url}
        playStatus={playStatus}
        playFromPosition={playFromPosition}
        onLoading={onLoading}
        onPlaying={onPlaying}
        onFinishedPlaying={onFinishedPlaying}
        onLoad={onLoad}
      />
    );
  }
}

export default SoundManager;
