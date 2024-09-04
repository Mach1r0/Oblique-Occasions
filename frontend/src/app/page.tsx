"use client";
import React, { useState, useEffect } from "react";
import { fetchAlbums } from "./fetch/fetchData";
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
        <Selling />
      </div>
      <div  className={Style["Container-upcoming"]}>
        <Upcoming />
      </div>
      <div className={Style["Container-artist"]}>
        <Artist />
      </div>
    </div>
  );
};

export default Home;
