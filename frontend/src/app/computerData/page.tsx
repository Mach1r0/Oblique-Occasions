import React from "react";
import styles from "../style/Computerdata.module.css";

export default function ComputerData() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Who is Computer Data?</h1>
        <p className={styles.date}>Sep 9, 2024</p>
        <img
          src="https://f4.bcbits.com/img/0014307733_10.jpg"
          alt="Computer Data"
          className={styles.headerImage}
        />
      </header>

      <main className={styles.content}>
        <section className={styles.section}>
          <p>
            Brett Henderson, also known as Computer Data, is one of the most influential and innovative artists in the world of electronic and house music. Based in San Francisco, California, Computer Data is known for his emotionally charged music. As a DJ, Computer Data built his name in the local San Francisco scene before the pandemic.
          </p>
          <img
            src="https://i.scdn.co/image/ab6761610000e5ebc7fcb7c5cd01e76cb16e8014"
            alt="Computer Data"
            className={styles.contentImage}
          />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Why did Computer Data stop making music?</h2>
          <p>
            The last appearance of Computer Data was in 2022. Since then, he hasn't released any new music or been active on social media. In a podcast with Vintage Society, he mentioned focusing on college. He is studying Computer Science in Germany and moved to Europe for better education and quality of life.
          </p>
          <img
            src="https://images.squarespace-cdn.com/content/v1/588b7aa846c3c45be3e8c430/1588043252901-T8MHSMN09CRCS69K5VJG/48403922_1850367855074867_3771693374285807616_o.jpg"
            alt="Brett Henderson"
            className={styles.contentImage}
          />
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>The Journey of Music</h2>
          <p>
            Computer Data started making music in 2014 during his first year of college. He was diagnosed with Eosinophilic, a rare autoimmune disease, which led him to take a break from university to focus on his health. During this time, he had a lot of free time to explore music, and since he struggled to express himself through words, he began learning Ableton every night to translate his thoughts into music.
          </p>
          <blockquote className={styles.quote}>
            "My music has always been a raw emotional output and a coping mechanism for me to express myself. I played the drums as a kid and always had a deep fondness for lush electronic music, especially synthesizers. I never expected anyone to like what I was making, and I was amazed that people resonated with my music. My earlier stuff was very slow-paced, but as time progressed, I kind of settled into my 'sound' and really enjoyed the more house/techno-oriented music I was creating. I came to love what I was doing and realized that this was what I wanted to dedicate my life to. Seeing people send me heartfelt messages about my music and how it impacted them really gave me a new perspective. The idea of working in the tech industry at a soul-sucking software engineering gig no longer appealed to me. I don't get to live a long life, and coming to terms with that meant that I wanted to make a positive impact with the time I have."
          </blockquote>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Computer Data's Style of Music</h2>
          <p>
            Many people don't fully understand Computer Data's music style. His sound is often confused with other genres like lo-fi or vaporwave. While there are similarities, the style, history, and structure of his music are completely different. Computer Data has mentioned being influenced by various genres, especially lo-fi and vaporwave, but in my opinion, his style is more like house lo-fi or deep house, with a unique and special touch. However, he prefers not to label his music within a single genre or limit it.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Listen to Computer Data</h2>
          <p>
            Finally, if you're interested, here's a full set by Computer Data. I hope you enjoy it, and thank you for reading.
          </p>
          <div className={styles.videoWrapper}>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/5HHpCZ8wVLY?autoplay=1"
              title="Computer Data | Fault Radio DJ Set at General Repairing, Oakland"
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
