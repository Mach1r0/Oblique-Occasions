import React from "react";
import styles from "../style/Vaporwave.module.css";

export default function Vaporwave() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Vaporwave: A Nostalgic Music Genre</h1>
        <p className={styles.date}>Sep 9, 2024</p>
        <img
          src="https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2021/11/vaporwave-aesthetic.jpg?w=1250&h=1120&crop=1"
          alt="Vaporwave Aesthetic"
          className={styles.headerImage}
        />
      </header>

      <main className={styles.content}>
        <section className={styles.section}>
          <p>
            Vaporwave is a music genre that branched off from Hypnagogic Pop in the early 2010s. Characterized by its nostalgic and surreal atmosphere, Vaporwave blends electronic music with chopped and screwed samples, while also featuring a distinct visual style that pays homage to bygone eras of popular culture, typically the Memphis Design, Y2K Futurism, and more recently Frutiger Aero eras.
          </p>
          <p>
            Vaporwave has been interpreted by many as a criticism or parody of corporate aesthetics and capitalism, though others disagree and instead see it as a celebration of these aesthetics. The genre is not merely a musical experience but also a cultural commentary on the rapid pace of technological advancement and the commodification of the past.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>History</h2>
          <p>
            The genre emerged in 2011 from online communities, such as Turntable.fm. In subsequent years, it gained popularity through websites such as Bandcamp, Soundcloud, Tumblr, Last.fm, 4chan, and YouTube. Its rise in popularity coincided with the decline of Seapunk, though Vaporwave focuses on a broader range of aesthetic cues, highlighting the period from the 1970s to the early 2000s.
          </p>
          <img
            src="https://unreal-music.com/wp-content/uploads/2023/04/vaporwave-1024x538.jpg"
            alt="Vaporwave History"
            className={styles.contentImage}
          />
          <p>
            While Seapunk focuses on early '90s CG images and aquatic life, Vaporwave spans a broader spectrum. Some mark the September 11, 2001 terrorist attacks as the end point of the aesthetic period, while others mark the Great Recession of 2008. Since 2022, Frutiger Aero aesthetics have also begun influencing the genre, making the cutoff point 2012-2013 when smartphones and flat design became fully popular.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Visuals</h2>
          <p>
            Popular visuals in Vaporwave aesthetics include anime, classical sculptures, consumerism, computer hardware from the '80s to early '00s, city skylines, malls, and liminal spaces. The inclusion of pink and teal colors, grids, shapes, and glitches further adds to the surreal, nostalgic vibe.
          </p>
          <img
            src="https://static.wikia.nocookie.net/aesthetics/images/3/32/Floral_shoppe.jpg/revision/latest?cb=20231014004939"
            alt="Vaporwave Visuals"
            className={styles.contentImage}
          />
          <p>
            Japanese characters and full-width Latin versions of letters are often incorporated into the visual style. The aesthetics often convey a sense of sadness or irony, emphasizing the soullessness of consumerism in a "sad but aesthetically pleasing" way.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Media</h2>
          <p>
            Vaporwave media is often found on YouTube, with series such as Dan Bell's "Dead Mall Series" and "Retail Archeology" exploring the theme. Films like *Spider-Man: Into The Spider-Verse*, *Valerian and the City of a Thousand Planets*, and *The Wave* incorporate Vaporwave aesthetics in their visual storytelling.
          </p>
          <img
            src="https://rarelimiteds.com/cdn/shop/products/blank-banshee-mega-Cover-Art_large.jpg?v=1674926974"
            alt="Vaporwave Media"
            className={styles.contentImage}
          />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Discover Vaporwave</h2>
          <p>
            If you're curious to explore more of this genre, check out this mix of Vaporwave music:
          </p>
          <div className={styles.videoWrapper}>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/1X2TwPb3y10"
              title="Windows96 - Enchanted Instrumentals and Whispers"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </section>
      </main>
    </div>
  );
}
