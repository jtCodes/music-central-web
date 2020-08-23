import React, { Component } from "react";
import PropTypes from "prop-types";
import "./NavSideBar.css";

export default class NavSideBar extends Component {
  static propTypes = {};

  render() {
    return (
      <nav class="music-browser-nav-sidebar">
        <input
          className="music-browser-nav-sidebar-search-input"
          type="text"
          id="lname"
          name="lname"
          placeholder="Search"
        />
        <ul>
          <li>
            <div className="music-browser-nav-link">Home</div>
          </li>
          <li>
            <div className="music-browser-nav-link-container">
              <div className="music-browser-nav-link nav-link-selected">
                Explore
              </div>
              <div className="nav-link-selected-indicator"></div>
            </div>
          </li>
          <li>
            <div className="music-browser-nav-link">Live</div>
          </li>
        </ul>
      </nav>
    );
  }
}
