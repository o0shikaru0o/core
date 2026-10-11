import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Core — Your group chat, made real",
  description: "A live demo of Core: the group chat becomes the store, and shared stories become real products.",
};

const projectUrl = "/projects/-1001234567890";
const productUrl = `${projectUrl}/products/demo-rose`;

export default function DemoPage() {
  return (
    <main id="top" className={styles.site}>
      <header className={styles.nav}>
        <Link href="/demo" className={styles.brand}>Core<span className={styles.brandDot}>.</span></Link>
        <nav aria-label="Main navigation">
          <a href="#story">The story</a>
          <a href="#experience">Experience</a>
          <Link href="/">Live app <span aria-hidden>↗</span></Link>
        </nav>
      </header>

      <section className={styles.intro}>
        <div>
          <p className={styles.eyebrow}>Shopping 3.0 / Live demo</p>
          <h1>Your group chat,<br /><em>made real.</em></h1>
        </div>
        <div className={styles.introRight}>
          <p className={styles.lede}>Core turns the stories only your friends understand into products only your group could make.</p>
          <p>A Telegram bot notices the moments that become group lore. Your friends vote on what to make. Arcade turns the winning idea into a real, made-to-order product. The Core app brings the collection and order journey together.</p>
          <div className={styles.meta}>
            <div><span>Built for</span><strong>Shopping 3.0 Hackathon</strong></div>
            <div><span>Experience</span><strong>Telegram bot · Core app · Arcade</strong></div>
            <div><span>Team</span><strong>Rachel · Ekene</strong></div>
          </div>
          <Link href="/demo/journey" className={styles.textLink}>Walk through the product <span aria-hidden>↗</span></Link>
        </div>
      </section>

      <section className={styles.hero} aria-label="Friends together, the heart of Core">
        <div className={styles.heroCopy}>
          <span className={styles.heroIndex}>01 / The group behind the story</span>
          <p>Made for<br />the people<br /><i>in the chat.</i></p>
        </div>
        <div className={styles.heroImage}>
          <Image src="/demo/group-chat.png" alt="A group of friends together outdoors" fill priority sizes="(max-width: 800px) 100vw, 55vw" />
          <span className={styles.heroImageLabel}>THE PEOPLE MAKE THE STORY</span>
        </div>
      </section>

      <section id="story" className={styles.splitSection}>
        <div><span className={styles.sectionNumber}>01 / The problem</span><h2>The best group stories have nowhere to go.</h2><p>Inside jokes, catchphrases, and legendary nights live in the chat, then disappear into the scroll. Making something together usually means someone has to design it, collect money, and coordinate production.</p></div>
        <div><span className={styles.sectionNumber}>02 / The idea</span><h2>Let the conversation invent the product.</h2><p>Core recognizes the lore, asks the group what it should become, and makes the chosen idea available for each person to buy. The group decides what deserves to exist.</p></div>
      </section>

      <section className={styles.quoteBand}>
        <p>“The product is invented from the conversation.”</p>
        <span>Core / Shopping 3.0</span>
      </section>

      <section id="experience" className={styles.process}>
        <div className={styles.sectionIntro}><span className={styles.sectionNumber}>03 / The experience</span><h2>From a shared moment<br />to something you can hold.</h2><p>A simple loop keeps the group in control, from the first spark to the final delivery.</p></div>
        <div className={styles.steps}>
          <div><span>01</span><strong>Keep chatting</strong><p>Core joins a Telegram group after an admin consents. Friends keep talking as usual.</p></div>
          <div><span>02</span><strong>Spot the lore</strong><p>AI finds a recurring moment and shows the messages that explain why it matters.</p></div>
          <div><span>03</span><strong>Vote together</strong><p>Members choose an Arcade product type or vote “No.” Nothing is made without the group.</p></div>
          <div><span>04</span><strong>Make it real</strong><p>Arcade generates a real product and price. Each member can check out individually.</p></div>
        </div>
      </section>

      <section className={styles.feature}>
        <div className={styles.featureCopy}><span className={styles.sectionNumber}>04 / The spark</span><h2>It starts with a moment everyone remembers.</h2><p>In Apartment 4B, Sam ends every group dinner with a “final rose.” Core catches the recurring joke and brings it back to the group as a product idea.</p><div className={styles.smallNote}>Real group context shapes the idea. A group vote decides if it moves forward.</div></div>
        <div className={styles.chatPanel} aria-label="Example Telegram conversation">
          <div className={styles.chatTop}><span className={styles.avatar}><Image src="/demo/group-chat.png" alt="" fill sizes="44px" /></span><div><strong>Apartment 4B</strong><small>group chat</small></div><span className={styles.chatMenu}>•••</span></div>
          <div className={styles.chatDate}>TODAY</div>
          <div className={styles.chatBubble}><strong>Sam</strong>and tonight&apos;s final rose goes to… whoever paid</div>
          <div className={styles.chatBubble}><strong>Mei</strong>the rose ceremony is the only reason I come to these</div>
          <div className={`${styles.chatBubble} ${styles.chatCore}`}><strong>Core</strong>There&apos;s a story here. Should “the final rose” become something your group can keep?<div className={styles.voteChips}><span>Pocket square</span><span>Napkins</span><span>No</span></div></div>
        </div>
      </section>

      <section className={`${styles.feature} ${styles.featureReverse}`}>
        <div className={styles.productStage}><div className={styles.productStageImage}><Image src="/demo/pattern-rose-lattice.jpg" alt="Final Rose floral design preview" fill sizes="(max-width: 800px) 100vw, 50vw" /></div><div className={styles.productStageCaption}><span>APARTMENT 4B / POCKET SQUARES</span><strong>The Final Rose</strong><small>Design preview</small></div></div>
        <div className={styles.featureCopy}><span className={styles.sectionNumber}>05 / The creation</span><h2>A one-of-one idea, made to order.</h2><p>The winning vote becomes a product with a real price through Arcade. Everyone sees the same shared story, then buys their own copy if they want one.</p><Link href={productUrl} className={styles.textLink}>Explore the product <span aria-hidden>↗</span></Link></div>
      </section>

      <section className={styles.appSection}>
        <div className={styles.appHeading}><div><span className={styles.sectionNumber}>06 / The Core app</span><h2>The group&apos;s collection,<br />all in one place.</h2></div><p>Browse everything the group has made, see the lore behind each design, and follow an order from checkout to delivery.</p></div>
        <div className={styles.appShowcase}>
          <Link href={projectUrl} className={styles.showcaseCard}><div className={styles.showcaseImage}><Image src="/demo/pattern-florals.jpg" alt="Floral print representing the group collection" fill sizes="(max-width: 800px) 100vw, 33vw" /></div><div><span>01 / DISCOVER</span><strong>The collection</strong><small>Products made from the group&apos;s shared lore.</small></div></Link>
          <Link href={productUrl} className={styles.showcaseCard}><div className={styles.showcaseImage}><Image src="/demo/pattern-rose-lattice.jpg" alt="Final Rose product design preview" fill sizes="(max-width: 800px) 100vw, 33vw" /></div><div><span>02 / REMEMBER</span><strong>The story behind it</strong><small>See the chat moments and votes that made it real.</small></div></Link>
          <Link href="/tracking" className={styles.showcaseCard}><div className={styles.showcaseImage}><Image src="/demo/necklace-garden.jpg" alt="Necklace preview from the group collection" fill sizes="(max-width: 800px) 100vw, 33vw" /></div><div><span>03 / FOLLOW</span><strong>Order tracking</strong><small>Know where your creation is in the making.</small></div></Link>
        </div>
      </section>

      <section className={styles.finalCta}><span className={styles.sectionNumber}>Ready to see it?</span><h2>Open the story.<br /><em>Explore the product.</em></h2><p>Start with the guided walkthrough, then explore the working app and its sample group.</p><div className={styles.actions}><Link href="/demo/journey" className={styles.primaryButton}>Start guided demo <span aria-hidden>↗</span></Link><Link href="/" className={styles.secondaryButton}>Explore the app <span aria-hidden>↗</span></Link></div></section>

      <footer className={styles.footer}><Link href="/demo" className={styles.brand}>Core<span className={styles.brandDot}>.</span></Link><p>Made from the moments that make us us.</p><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}
