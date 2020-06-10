import React, { PureComponent } from "react";
import Blur from "./ReactBlur/src/blur";

class BackgroundImage extends PureComponent {
  render() {
    const { backgroundImage } = this.props;
    return (
      <div
        className="music-central-app-background"
      >
        <Blur img={backgroundImage} blurRadius={100}>
        </Blur>
      </div>
    );
  }
}

export default BackgroundImage;
