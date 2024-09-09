"use client";
import React from "react";
import styles from "./style/Header.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <div className={styles.containerAll}>
      <div className={styles.containerContent}>
        <div className={styles.ContainerImgPrin}>
          <img
            src="img/comet-minimalism-blank-banshee-vaporwave-wallpaper-preview.jpg"
            alt="header"
            className={styles.HeaderImage}
          />
          <div className={styles.imageText}>
            <Link href="/">
            <h2>Essential Releases, August 30, 2024</h2>
            </Link>
              <p>Shoegaze, techno, indie psychedelia, and more.</p>
          </div>
        </div>
        <div className={styles.ContainerImgSec}>
          <div className={styles.imgSecItem}>
            <img
              src="img/a3339089756_16.jpg"
              alt="header"
              className={styles.imgSec}
            />
            <Link href="/">
              <p className={styles.textOverlay}>
                Ten Tour Tips from John Dwyer of OSEES
              </p>
            </Link>
          </div>
          <div className={styles.imgSecItem}>
            <img
              src="img/a3601077058_16.jpg"
              alt="header"
              className={styles.imgSec}
            />
            <Link href="/">
              <p className={styles.textOverlay}>The Metal Show</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}