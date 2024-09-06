import React from 'react'
import styles from '../style/Settings.module.css'

export default function Settings() {
  return (
    <div className={styles['container-settings']}>
        <div className={styles['container-content']}>
            <h1> Account </h1>
            <div className={styles['container-info']}>
                <div className={styles['container-info-item']}>
                    <p> Name: </p>
                    <input />
                    <p> Email: </p>
                    <input />
                </div>
            </div>
            <button> UPDATE</button>
        </div>
    </div>
  )
}
