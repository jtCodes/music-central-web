import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyBH6E-wHIRMge-31JvpbyIyom6ICb-cc7A",
  authDomain: "music-central-dfb24.firebaseapp.com",
  databaseURL: "https://music-central-dfb24.firebaseio.com",
  projectId: "music-central-dfb24",
  storageBucket: "music-central-dfb24.appspot.com",
  messagingSenderId: "65374935965",
  appId: "1:65374935965:web:8af25bb1caa0c40dde6d74",
  measurementId: "G-J5NEF7ZG5N",
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  setSongLyrics(songName, lyrics) {
    this.db.ref("song/" + songName).set({
      lyrics: lyrics,
    });
  }

  getSongLyrics = (songName) => this.db.ref("song/" + songName);

  getSongDetails = (songName) => this.db.ref("song/" + songName);
}

export default Firebase;
