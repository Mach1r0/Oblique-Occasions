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
            src="https://f4.bcbits.com/img/0014307733_10.jpg"
            alt="header"
            className={styles.HeaderImage}
          />
          <div className={styles.imageText}>
            <Link href="/computerData">
            <h2>Computer data</h2>
            </Link>
              <p> Will computer data come back? </p>
          </div>
        </div>
        <div className={styles.ContainerImgSec}>
          <div className={styles.imgSecItem}>
            <img
              src="https://images.squarespace-cdn.com/content/v1/5bd7707c11f7847c45b4b9dd/1651265930478-R7IIGQCKHAL64FLZ18F9/a3309345917_10.jpg"
              alt="header"
              className={styles.imgSec}
            />
            <Link href="/BaberBeats">
              <p className={styles.textOverlay}>
              What is barber beats
              </p>
            </Link>
          </div>
          <div className={styles.imgSecItem}>
            <img
              src="https://res.cloudinary.com/sagacity/image/upload/c_crop,h_1080,w_1920,x_0,y_0/c_limit,dpr_auto,f_auto,fl_lossy,q_80,w_1080/vaporwave_zoevlz.jpg"
              alt="header"
              className={styles.imgSec}
            />
            <Link href="/vaporwave">
              <p className={styles.textOverlay}>Vaporwave all about the genrer</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}