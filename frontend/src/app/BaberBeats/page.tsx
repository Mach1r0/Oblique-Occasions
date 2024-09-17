import React from "react";
import styles from "../style/BaberBeats.module.css";

export default function BaberBeats() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>BARBER BEATS: A Controversial Music Genre</h1>
        <p className={styles.date}>Sep 9, 2024</p>
        <img
          src="https://lastfm.freetls.fastly.net/i/u/770x0/b88d04e2bc0437169d1ce959b20e86f6.jpg#b88d04e2bc0437169d1ce959b20e86f6"
          alt="Barber Beats"
          className={styles.headerImage}
        />
      </header>

      <main className={styles.content}>
        <section className={styles.section}>
          <p>
            Barber Beats is an online music genre that has gained significant attention. Its explosive rise in the 2020s has seen hundreds of colorful music releases, many of which have popped up in YouTube recommendations, garnering hundreds of thousands or even millions of plays.
          </p>
          <p>
            The sound of Barber Beats heavily features sampled downtempo tracks, drawing from styles like trip-hop, nu jazz, lo-fi house, atmospheric hip-hop, and other mellow music styles. The end result is a smooth, luxurious blend of soundscapes that evoke the relaxed, cozy vibes of getting a haircut at a quiet barber shop in the heart of a bustling city.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>A Unique Blend of Sounds</h2>
          <p>
            The sound of Barber Beats is often described as “half casino heist, half forbidden romance,” capturing the sophisticated yet mysterious atmosphere that the genre’s tracks exude. However, there’s a lot of debate about the originality of the genre since many of these tracks feature minimal edits to the original sample material. This has led to ongoing discussions about the ethics of artists profiting from music that is largely derived from other sources.
          </p>
          <img
            src="https://lastfm.freetls.fastly.net/i/u/770x0/76691e025535c5ae63c06ff99b718736.jpg#76691e025535c5ae63c06ff99b718736"
            alt="Barber Beats Vibes"
            className={styles.contentImage}
          />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>The Evolution of Barber Beats</h2>
          <p>
            The inception of Barber Beats can be traced back to a producer known as *Haircuts for Men*, whose projects date back to 2014. Releases like *大理石のファンタジー* ("Marble Fantasy") and *ダウンタンブルと死にます* ("Down Tumble and Die") played a significant role in shaping the genre and cementing its place in online music culture.
          </p>
          <p>
            The visual aesthetics of Barber Beats are also crucial to its appeal. Albums feature beautifully designed artwork with unique color palettes, combining vintage and modern styles that draw listeners in even before hearing the music. This cohesive visual identity is a hallmark of the genre.
          </p>
          <img
            src="https://lastfm.freetls.fastly.net/i/u/770x0/e202e34545e2cc19860e1cf1343fd6d0.jpg#e202e34545e2cc19860e1cf1343fd6d0"
            alt="Barber Beats Evolution"
            className={styles.contentImage}
          />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Barber Beats in the 2020s</h2>
          <p>
            By the 2020s, Barber Beats had expanded significantly, with new artists contributing to the scene. Producers like *Macroblank*, *Oblique Occasions*, *Modest by Default*, and *Monodrone* became well-known names, pushing the genre forward with new releases.
          </p>
          <p>
            Albums like *痛みの永遠* ("It Hurts Forever") by *Macroblank* and *分離された* ("Separation") are prime examples of how the genre continues to evolve while maintaining the foundational elements introduced by *Haircuts for Men*. These releases reflect the same dreamy, sophisticated sound while incorporating new influences and styles.
          </p>
          <img
            src="https://lastfm.freetls.fastly.net/i/u/770x0/5d4e92ee49f3d1897ee85c1b3963e88b.jpg#5d4e92ee49f3d1897ee85c1b3963e88b"
            alt="Barber Beats Expansion"
            className={styles.contentImage}
          />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>The Controversy</h2>
          <p>
            Despite its rise, Barber Beats faces controversy. Critics argue that because the genre relies so heavily on unaltered samples, its legitimacy as an original art form is questionable, especially when artists sell their work both digitally and in physical formats.
          </p>
          <p>
            Regardless of the debate, the genre's popularity continues to grow, and its atmospheric, soothing soundscapes resonate with many listeners looking for music to relax to or set a particular mood.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Discover Barber Beats</h2>
          <p>
            If you’re curious to explore more of this genre, here’s a full mix to get you started:
          </p>
          <div className={styles.videoWrapper}>
          <iframe width="1835" height="797" src="https://www.youtube.com/embed/ryi6lhCByyY" title="Opal Vessel - 腐敗した死体 [Barber Beats/Vaporwave] [Full album]" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>
        </section>
      </main>
    </div>
  );
}
