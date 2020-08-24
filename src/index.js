import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ArtistPage from "./MusicBrowser/ArtistPage/ArtistPage";
import * as artistTestData from "./MusicBrowser/ArtistPage/TestData.js";
import * as serviceWorker from "./serviceWorker";
import Firebase, { FirebaseContext } from "./Firebase";
// import App from "./p5Test";

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    {/* <App /> */}
    <ArtistPage data={artistTestData[window.location.pathname.split("/")[1]]} />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
