"use client";
import React from "react";
import Header from "./components/header";
import Selling from "./components/selling";
import Style from "./style/Home.module.css";
import Upcoming from "./components/New"
import Artist from "./components/Artist"

const Home = () => {
  return (
    <div className={Style["container-all"]}>
      <div className={Style["container-header"]}>
        <Header />
      </div>
      <div className={Style["container-selling"]}>
        <h2 className={Style["section-title"]}>Top Selling Albums</h2>
        <div className={Style["section-container"]}>
          <Selling />
        </div>
      </div>
      <div className={Style["Container-upcoming"]}>
        <h2 className={Style["section-title"]}>Upcoming Releases</h2>
        <div className={Style["section-container"]}>
          <Upcoming />
        </div>
      </div>
      <div className={Style["Container-artist"]}>
        <h2 className={Style["section-title"]}>Featured Artists</h2>
        <div className={Style["section-container"]}>
          <Artist />
        </div>
      </div>
    </div>
  );
};

export default Home;
