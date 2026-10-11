"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./page.module.css";

const steps = ["The chat", "Core spots the lore", "The group votes", "Arcade creates", "Explore and track"] as const;

export default function JourneyPage() {
  const [step, setStep] = useState(0);
  const [vote, setVote] = useState<string | null>(null);
  const next = () => setStep((current) => current === 2 && (!vote || vote === "No") ? current : Math.min(current + 1, steps.length - 1));
  const previous = () => setStep((current) => Math.max(current - 1, 0));

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <Link href="/demo" className={styles.brand}>Core<span>.</span></Link>
        <span>Guided product demo</span>
        <Link href="/" className={styles.exit}>Open app ↗</Link>
      </header>

      <div className={styles.shell}>
        <aside className={styles.story}>
          <p className={styles.kicker}>SHOPPING 3.0 / INTERACTIVE WALKTHROUGH</p>
          <h1>From group chat<br />to <em>something real.</em></h1>
          <p className={styles.lede}>A shared joke becomes a product your friends actually want. Follow the demo from the first message through the order journey.</p>
          <ol className={styles.steps} aria-label="Demo steps">
            {steps.map((label, index) => (
              <li key={label}>
                <button type="button" aria-current={step === index ? "step" : undefined} onClick={() => setStep(index)} className={step === index ? styles.active : ""}>
                  <span>{String(index + 1).padStart(2, "0")}</span>{label}
                </button>
              </li>
            ))}
          </ol>
          <p className={styles.disclosure}>Illustrative chat and product data. The linked Core app is a working demo with sample content.</p>
        </aside>

        <section className={styles.stage} aria-live="polite">
          <div className={styles.stageHeader}><span>APARTMENT 4B</span><span>{String(step + 1).padStart(2, "0")} / 05</span></div>
          {step <= 2 ? (
            <div className={styles.phone}>
              <div className={styles.chatHeader}><span className={styles.avatar}><Image src="/demo/group-chat.png" alt="" fill sizes="42px" /></span><div><strong>Apartment 4B</strong><small>group chat</small></div><span className={styles.dots}>•••</span></div>
              <div className={styles.chatBody}>
                <span className={styles.date}>TODAY</span>
                <div className={styles.bubble}><strong>Sam</strong>and tonight&apos;s final rose goes to… whoever paid</div>
                <div className={styles.bubble}><strong>Mei</strong>the rose ceremony is the only reason I come to these</div>
                <div className={styles.bubble}><strong>Jo</strong>Sam brought an actual rose again 😂</div>
                {step >= 1 && <div className={`${styles.bubble} ${styles.bot}`}><strong>Core</strong>I noticed a running joke: Sam&apos;s “final rose” ends every dinner. Should we make it into something your group can keep?{step >= 2 && <div className={styles.voteOptions}>{["Pocket square", "Napkins", "No"].map((option) => <button key={option} type="button" className={vote === option ? styles.selectedVote : ""} onClick={() => setVote(option)}>{option}{vote === option ? " ✓" : ""}</button>)}</div>}</div>}
              </div>
              <div className={styles.phoneFooter}>{step === 0 ? "Friends keep chatting as usual" : step === 1 ? "Core proposes; the group stays in control" : vote === "No" ? "No means nothing is made. Choose a product to continue this walkthrough." : vote ? `Your demo vote: ${vote}` : "Choose a demo vote above to continue"}</div>
            </div>
          ) : step === 3 ? (
            <div className={styles.creation}>
              <div className={styles.productImage}><Image src="/demo/pattern-rose-lattice.jpg" alt="Floral design preview for The Final Rose" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
              <div className={styles.productInfo}><span>DESIGN PREVIEW / POCKET SQUARE</span><h2>The Final Rose</h2><p>After the group chooses a product type, Arcade creates a design and price. Each friend can choose to buy their own copy.</p><strong>$32.00 each</strong></div>
            </div>
          ) : (
            <div className={styles.finish}>
              <div className={styles.finishImage}><Image src="/demo/pattern-rose-lattice.jpg" alt="The Final Rose design preview" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
              <div><p className={styles.kicker}>THE CORE APP</p><h2>The story travels with the product.</h2><p>Open the sample collection to see the lore, source messages, and price. Then follow a sample order through production.</p><div className={styles.finishLinks}><Link href="/projects/-1001234567890/products/demo-rose">Explore product ↗</Link><Link href="/tracking/demo-o2">Track sample order ↗</Link></div></div>
            </div>
          )}
          <div className={styles.controls}><button type="button" onClick={previous} disabled={step === 0}>← Previous</button><span>{step === 0 ? "The spark" : step === 1 ? "AI finds a story worth sharing" : step === 2 ? "The group decides what exists" : step === 3 ? "Made to order" : "Your collection, together"}</span><button type="button" onClick={next} disabled={step === steps.length - 1 || (step === 2 && (!vote || vote === "No"))}>Next →</button></div>
        </section>
      </div>
    </main>
  );
}
