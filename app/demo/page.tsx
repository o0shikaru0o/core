import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Core — Friendship, made tangible",
  description: "Core turns the stories a group shares into products they can hold. Explore the live demo.",
};

const projectUrl = "/projects/-1001234567890";
const productUrl = `${projectUrl}/products/demo-rose`;

const journey = [
  { number: "01", title: "A moment becomes lore", text: "Friends keep talking. A line, a ritual, or an old joke comes back again and again.", cue: "“And tonight’s final rose goes to…”" },
  { number: "02", title: "Core notices the pattern", text: "With an admin’s consent, Core finds the recurring story and shows the messages behind it.", cue: "A story the whole group recognizes" },
  { number: "03", title: "The group decides", text: "Friends vote on a real product type, or vote No. The group has the final say.", cue: "Pocket square · Napkins · No" },
  { number: "04", title: "Arcade makes it real", text: "The chosen idea becomes a made-to-order product with an image and a real price.", cue: "One idea, made for this group" },
  { number: "05", title: "Everyone keeps their own", text: "Each friend can buy a copy. Core keeps the story and order journey in one place.", cue: "A shared memory, individually owned" },
];

const screens = [
  { href: projectUrl, src: "/demo/app-projects.png", alt: "Core Projects screen showing the Apartment 4B group collection", label: "01 / COLLECT", title: "A home for every group", text: "The group’s creations live together in one collection." },
  { href: productUrl, src: "", alt: "", label: "02 / REMEMBER", title: "The story stays with it", text: "Every design keeps the lore and chat moments that inspired it." },
  { href: "/tracking/demo-o2", src: "/demo/app-tracking.png", alt: "Core order screen showing design review and production progress", label: "03 / FOLLOW", title: "Follow it into the world", text: "See the order move from design review to delivery." },
];

export default function DemoPage() {
  return (
    <main id="top" className={styles.site}>
      <header className={styles.nav}>
        <Link href="/demo" className={styles.brand}>Core<span>.</span></Link>
        <nav aria-label="Main navigation">
          <a href="#story">The story</a>
          <a href="#how">How it works</a>
          <a href="#app">The app</a>
          <Link href="/demo/journey">Guided demo <span aria-hidden="true">↗</span></Link>
        </nav>
      </header>

      <section className={styles.intro}>
        <div>
          <p className={styles.eyebrow}>Core (2026) / Shopping 3.0</p>
          <h1>Friendship,<br /><em>made tangible.</em></h1>
        </div>
        <div className={styles.introRight}>
          <p className={styles.lede}>The best things about a friend group rarely look like products. They look like the stories only that group understands.</p>
          <p>Core turns those stories into things friends can hold. A Telegram bot notices shared lore, the group votes on what it should become, and Arcade makes the chosen idea. The Core app gives every creation a home and lets each friend follow their own order.</p>
          <div className={styles.meta}>
            <div><span>Team</span><strong>Rachel · Ekene</strong></div>
            <div><span>Roles</span><strong>App, design & pitch · Bot</strong></div>
            <div><span>Built with</span><strong>Telegram · OpenAI · Arcade · Next.js</strong></div>
          </div>
          <Link href="/demo/journey" className={styles.textLink}>Walk through the product <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section className={styles.hero} aria-label="Friendship is the beginning of Core">
        <Image src="/demo/group-chat.png" alt="Illustrative photograph of a group of friends gathered outdoors" fill priority sizes="100vw" />
        <div className={styles.heroShade} />
        <div className={styles.heroCopy}><span>THE IDEA</span><p>The people<br />make the product.</p></div>
      </section>

      <section id="story" className={styles.problemSolution}>
        <div><span className={styles.sectionNumber}>01 / The problem</span><h2>Friendship has a language. It disappears into the scroll.</h2><p>Inside jokes, nicknames, and rituals make a group feel like itself. But they stay buried in messages. Making custom merch takes design work, money collection, and coordination that no one volunteered to do.</p></div>
        <div><span className={styles.sectionNumber}>02 / The solution</span><h2>Give the group a way to keep what only they understand.</h2><p>Core finds a recurring story, asks the friends whether it deserves to become something, and gives their choice a real form through Arcade. Each person can take home their own copy.</p></div>
      </section>

      <section className={styles.photoEssay} aria-label="Illustrative friendship imagery">
        <div className={styles.photoEssayIntro}><span className={styles.sectionNumber}>Before the product</span><h2>There was a night.<br />A line. A person.<br /><em>A reason it mattered.</em></h2><p>The product is the last chapter. The friendship is the source.</p></div>
        <figure className={styles.photoLounge}><Image src="/demo/friends-lounge.webp" alt="Illustrative photograph of friends spending an evening together" fill sizes="(max-width: 760px) 100vw, 55vw" /><figcaption>01 / THE MOMENTS</figcaption></figure>
        <figure className={styles.photoCar}><Image src="/demo/friends-car.webp" alt="Illustrative photograph of four friends together in a car" fill sizes="(max-width: 760px) 100vw, 30vw" /><figcaption>02 / THE PEOPLE</figcaption></figure>
        <figure className={styles.photoTrees}><Image src="/demo/friends-trees.webp" alt="Illustrative photograph of a friend group gathered beneath trees" fill sizes="(max-width: 760px) 100vw, 30vw" /><figcaption>03 / THE MEMORY</figcaption></figure>
      </section>

      <section id="how" className={styles.journey}>
        <div className={styles.journeyHeading}><span className={styles.sectionNumber}>03 / The journey</span><h2>From group chat<br />to something real.</h2><p>Core is a small bridge between a story that happened and an object that can stay. The group remains in control at the point that matters most.</p></div>
        <div className={styles.journeyVisual}>
          <div className={styles.cutout}><Image src="/demo/friends-cutout.webp" alt="Illustrative overhead view of people talking together" fill sizes="(max-width: 760px) 100vw, 36vw" /></div>
          <ol className={styles.flow}>
            {journey.map((step) => <li key={step.number}><span className={styles.flowNumber}>{step.number}</span><div><h3>{step.title}</h3><p>{step.text}</p><small>{step.cue}</small></div></li>)}
          </ol>
        </div>
        <div className={styles.controlNote}><strong>People choose what exists.</strong><p>An admin consents before Core collects new messages. The group can vote No; nothing is made unless it chooses a product.</p></div>
      </section>

      <section className={styles.example}>
        <div className={styles.exampleIntro}><span className={styles.sectionNumber}>04 / A story from the demo</span><h2>The Final Rose</h2><p>At the end of every dinner, Sam names a “final rose.” The group keeps bringing it up. Core sees a shared ritual and asks whether to turn it into something everyone can keep.</p><span className={styles.exampleDisclosure}>Illustrative group chat and sample product.</span></div>
        <div className={styles.exampleGrid}>
          <div className={styles.chatPanel} aria-label="Illustrative Telegram group conversation">
            <div className={styles.chatTop}><span className={styles.avatar}><Image src="/demo/group-chat.png" alt="" fill sizes="44px" /></span><div><strong>Apartment 4B</strong><small>group chat</small></div><span aria-hidden="true">•••</span></div>
            <div className={styles.chatDate}>TODAY</div>
            <div className={styles.chatBubble}><strong>Sam</strong>and tonight&apos;s final rose goes to… whoever paid</div>
            <div className={styles.chatBubble}><strong>Mei</strong>the rose ceremony is the only reason I come to these</div>
            <div className={`${styles.chatBubble} ${styles.chatCore}`}><strong>Core</strong>There&apos;s a story here. Should “the final rose” become something your group can keep?<div className={styles.voteChips}><span>Pocket square</span><span>Napkins</span><span>No</span></div></div>
          </div>
          <div className={styles.productPanel}><div className={styles.productImage}><Image src="/demo/pattern-rose-lattice.jpg" alt="Floral design preview for The Final Rose pocket square" fill sizes="(max-width: 760px) 100vw, 50vw" /></div><div className={styles.productCaption}><span>MADE FROM A SHARED STORY</span><h3>The Final Rose Pocket Square</h3><p>Design preview · $32 each</p><Link href={productUrl}>See the story in Core ↗</Link></div></div>
        </div>
      </section>

      <section id="app" className={styles.appSection}>
        <div className={styles.appHeading}><div><span className={styles.sectionNumber}>05 / The Core app</span><h2>The product keeps<br />its story.</h2></div><p>The Core app gives the group a collection, shows why each object exists, and follows the order into the real world.</p></div>
        <div className={styles.appShowcase}>
          {screens.map((screen) => <Link href={screen.href} key={screen.label} className={styles.showcaseCard}><div className={styles.showcaseImage}><div className={styles.screenFrame}>{screen.src ? <Image src={screen.src} alt={screen.alt} fill sizes="(max-width: 760px) 220px, 260px" /> : <div className={styles.storyScreen}><div className={styles.storyScreenTop}>‹ <strong>Apartment 4B</strong></div><div className={styles.storyScreenCard}><small>THE STORY</small><h4>Sam hands out a “final rose” at the end of every group dinner</h4><p>Three people reference Sam&apos;s rose ceremony, and it&apos;s become how dinners end.</p><em>Your group chose Pocket Squares · 4 votes</em></div><h5>From the chat</h5><div className={styles.storyMessage}><small>Sam</small><p>and tonight&apos;s final rose goes to… whoever paid</p></div><div className={styles.storyMessage}><small>Mei</small><p>the rose ceremony is the only reason I come to these</p></div></div>}</div></div><div className={styles.showcaseCopy}><span>{screen.label}</span><h3>{screen.title}</h3><p>{screen.text}</p><b aria-hidden="true">↗</b></div></Link>)}
        </div>
      </section>

      <section className={styles.close}><span className={styles.sectionNumber}>Friendship as a product</span><h2>Not another thing.<br /><em>A thing that means something.</em></h2><p>Every group has a story worth keeping. Core gives them a way to make it together.</p><div className={styles.actions}><Link href="/demo/journey" className={styles.primaryButton}>Start guided demo <span aria-hidden="true">↗</span></Link><Link href="/" className={styles.secondaryButton}>Explore the app <span aria-hidden="true">↗</span></Link></div></section>

      <footer className={styles.footer}><Link href="/demo" className={styles.brand}>Core<span>.</span></Link><p>Made from the moments that make us us.</p><a href="#top">Back to top ↑</a></footer>
    </main>
  );
}
