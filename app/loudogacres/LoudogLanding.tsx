'use client';

import { useState, type FormEvent } from 'react';
import styles from './loudog.module.css';
import { LANDSCAPE_OFFERS, TRACTOR_SERVICES, TRACTOR_DURATIONS, TRACTOR_MIN_HOURS } from './pricing';

type RequestType = 'Botanical enhancement' | 'Tractor & property service' | 'Landscape stewardship' | 'Bespoke landscaping' | 'Contractor partnership' | 'Landscape consultation';
const requestTypes: RequestType[] = ['Botanical enhancement', 'Tractor & property service', 'Landscape stewardship', 'Bespoke landscaping', 'Landscape consultation', 'Contractor partnership'];
const services = [
  { number: '01', type: 'BOTANICAL ENHANCEMENTS', title: 'Bring hardscapes to life.', desc: 'Transform your existing landscape by dedicating approximately 30% of the space to purposeful plantings. We thoughtfully integrate culinary herbs, vegetables, fruit-bearing trees and shrubs, and beneficial flowering botanicals into your established surroundings — creating a landscape that is as productive as it is beautiful.', note: 'Not a separate garden. A more purposeful landscape.', cls: 'enhance' },
  { number: '02', type: 'LANDSCAPE STEWARDSHIP', title: 'Care that continues.', desc: 'Ongoing landscape maintenance and seasonal improvements, coordinated through trusted horticultural professionals.', cls: 'care' },
  { number: '03', type: 'TRACTOR & PROPERTY SERVICES', title: 'Practical work. Done well.', desc: 'Bush hogging, tilling, material spreading, light driveway upkeep, garden preparation and acreage care with a compact Kubota tractor.', cls: 'tractor' },
  { number: '04', type: 'BESPOKE LANDSCAPING', title: 'Designed for the land.', desc: 'Landscape concepts and planting plans shaped by the site, the people who use it, and the character of Southeast Tennessee.', cls: 'design' },
];

export default function LoudogLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [requestType, setRequestType] = useState<RequestType>('Botanical enhancement');
  const [notice, setNotice] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formStartedAt] = useState(() => Date.now());
  const [offerIndex, setOfferIndex] = useState(0);
  const [optionIndex, setOptionIndex] = useState(0);
  const [tractorIndex, setTractorIndex] = useState(0);
  const [hours, setHours] = useState(TRACTOR_MIN_HOURS as number);
  const [estimate, setEstimate] = useState('');
  const offer = LANDSCAPE_OFFERS[offerIndex];
  const option = offer.options[optionIndex] || offer.options[0];
  const tractor = TRACTOR_SERVICES[tractorIndex];
  const money = (amount: number) => new Intl.NumberFormat('en-US', {style:'currency', currency:'USD', maximumFractionDigits:0}).format(amount);
  function chooseEstimate(type: RequestType, summary: string) { setRequestType(type); setEstimate(summary); }


  const navClick = () => setMenuOpen(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (formStatus === 'sending') return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setFormStatus('sending');
    setNotice('');
    try {
      const response = await fetch('/api/loudogacres/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          location: data.get('location'),
          details: data.get('details'),
          company: data.get('company'),
          requestType,
          estimate,
          startedAt: formStartedAt,
        }),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.ok) throw new Error(result?.error || 'We could not send your message right now. Please try again shortly.');
      form.reset();
      setEstimate('');
      setFormStatus('success');
      setNotice("Thank you — your inquiry has been sent. We'll be in touch soon.");
    } catch (error) {
      setFormStatus('error');
      setNotice(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    }
  }

  return (
    <main className={styles.site}>
      <div className={styles.topline}><span>LOCALLY ROOTED</span><span>CLEVELAND · CHATTANOOGA · SOUTHEAST TENNESSEE</span></div>
      <header className={styles.header}>
        <a href="#top" className={styles.wordmark} onClick={navClick} aria-label="Loudog Acres home"><span>LOUDOG ACRES</span><small>BESPOKE LANDSCAPING &amp; PROPERTY SERVICES</small></a>
        <button className={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">{menuOpen ? 'CLOSE' : 'MENU'} <span>{menuOpen ? '×' : '☰'}</span></button>
        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`} aria-label="Main navigation">
          <a onClick={navClick} href="#approach">OUR APPROACH</a><a onClick={navClick} href="#services">SERVICES</a><a onClick={navClick} href="#pricing">PRICING</a><a onClick={navClick} href="#partners">PARTNERSHIPS</a><a onClick={navClick} href="#field-guide">FIELD GUIDE</a><a onClick={navClick} href="#about">ABOUT</a><a onClick={navClick} className={styles.navCta} href="#contact">REQUEST AN ESTIMATE <span>↗</span></a>
        </nav>
      </header>

      <section id="top" className={styles.hero}>
        <div className={styles.heroAccent} aria-hidden="true">LAND · ROOTS · RENEWAL</div>
        <div className={styles.heroGrid}>
          <div className={styles.heroText}>
            <p className={styles.eyebrow}>A MORE THOUGHTFUL LANDSCAPE</p>
            <h1>Beautiful by Nature.<br /><em>Bountiful by Design.</em></h1>
            <p className={styles.heroDescription}>Edible and botanical landscape enhancements, long-term stewardship, and practical tractor services — rooted in the land and created for the way you live.</p>
            <div className={styles.heroButtons}><a href="#contact" className={styles.primaryButton}>LET'S TALK ABOUT YOUR PROPERTY <span>↗</span></a><a className={styles.textLink} href="#services">EXPLORE SERVICES <span>↓</span></a></div>
            <p className={styles.heroFoot}>LANDSCAPE DEVELOPMENT & PROPERTY STEWARDSHIP</p>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.logoPaper}><img src="/loudogacres/logo.jpg" alt="Loudog Acres landscaping logo with two dogs and native flowers" /><div className={styles.logoCaption}>A STORY ROOTED IN THE LAND.</div></div>
            <div className={styles.sidetag}>ROOTED IN TENNESSEE / 001</div>
          </div>
        </div>
      </section>

      <section className={styles.intro} id="approach">
        <div className={styles.sectionLabel}><span>01</span> THE LOUDOG APPROACH</div>
        <div className={styles.introBody}><h2>Not another space.<br /><em>A more living landscape.</em></h2><div><p>We believe the most compelling outdoor spaces find a natural balance between what is built and what grows. Loudog Acres adds the botanical finishing layer to existing hardscapes — not a separate garden to maintain.</p><p>Our flexible design approach considers approximately <strong>30% living landscape coverage</strong> where appropriate to the site, rather than a rigid formula. Every planting is selected for the conditions, the setting and the long view.</p></div></div>
        <div className={styles.pillars}><div><span>01 /</span><strong>LIVING LANDSCAPES</strong></div><div><span>02 /</span><strong>LAND STEWARDSHIP</strong></div><div><span>03 /</span><strong>BOTANICAL KNOWLEDGE</strong></div></div>
      </section>

      <section className={styles.servicesSection} id="services">
        <div className={styles.sectionLabel}><span>02</span> OUR WORK</div>
        <div className={styles.sectionHeading}><h2>What the land needs.<br /><em>What you imagine.</em></h2><p>We shape and coordinate distinctive landscape improvements, with trusted installation partners and hands-on property services where they make sense.</p></div>
        <div className={styles.servicesGrid}>{services.map(s=><article className={`${styles.service} ${styles[s.cls]}`} key={s.number}><div className={styles.serviceTop}><span>{s.number}</span><span>↗</span></div><div><p className={styles.serviceType}>{s.type}</p><h3>{s.title}</h3><p className={styles.serviceDescription}>{s.desc}</p>{'note' in s && s.note ? <p className={`${styles.serviceDescription} ${styles.serviceNote}`}>{s.note}</p> : null}</div></article>)}</div>
      </section>


      <section className={styles.pricingSection} id="pricing">
        <div className={styles.sectionLabel}><span>03</span> SERVICES & STARTING PRICES</div>
        <div className={styles.sectionHeading}><h2>Good work.<br/><em>Clear expectations.</em></h2><p>Choose a starting point for your property. Every project is assessed individually, with a written quote before work begins.</p></div>
        <h3 className={styles.priceSubhead}>Landscaping offers</h3>
        <div className={styles.offerGrid}>{LANDSCAPE_OFFERS.map((o,i)=><article key={o.name} className={styles.offerCard}><span className={styles.offerNo}>0{i+1} / LANDSCAPING</span><h4>{o.name}</h4><p className={styles.priceAmount}>{o.request === 'Landscape consultation' ? '' : 'From '}{money(o.price)} <small>/ {o.unit}</small></p><p>{o.description}</p><a href="#landscape-estimator" className={styles.offerLink} onClick={()=>{setOfferIndex(i);setOptionIndex(0);}}>EXPLORE THIS OFFER ↗</a></article>)}</div>
        <div className={styles.estimatorGrid}>
          <div className={styles.estimator} id="landscape-estimator"><span className={styles.offerNo}>01 / LANDSCAPE BUDGET</span><h3>Plan your landscape.</h3><label htmlFor="offer">SERVICE</label><select id="offer" value={offerIndex} onChange={e=>{setOfferIndex(Number(e.target.value));setOptionIndex(0);}}>{LANDSCAPE_OFFERS.map((o,i)=><option value={i} key={o.name}>{o.name}</option>)}</select><label htmlFor="offer-size">SCOPE OR FREQUENCY</label><select id="offer-size" value={optionIndex} onChange={e=>setOptionIndex(Number(e.target.value))}>{offer.options.map((o,i)=><option key={o.label} value={i}>{o.label}</option>)}</select><div className={styles.estimateResult} aria-live="polite"><span>{offer.request === 'Landscape consultation' ? 'CONSULTATION FEE' : 'STARTING BUDGET'}</span><strong>{money(option.price)} <small>/ {offer.unit}</small></strong></div><p>Plant selection, site access, installation and ongoing care requirements may change the final quote. Consultation travel outside the local service area may cost extra.</p><a className={styles.primaryButton} href="#contact" onClick={()=>chooseEstimate(offer.request as RequestType, `${offer.name} — ${option.label}: ${money(option.price)} / ${offer.unit} starting budget`)}>REQUEST LANDSCAPE ESTIMATE ↗</a></div>
          <div className={styles.estimator} id="tractor-estimator"><span className={styles.offerNo}>02 / TRACTOR LABOR</span><h3>Put the land to work.</h3><label htmlFor="tractor-service">TRACTOR SERVICE</label><select id="tractor-service" value={tractorIndex} onChange={e=>setTractorIndex(Number(e.target.value))}>{TRACTOR_SERVICES.map((t,i)=><option value={i} key={t.name}>{t.name} — {money(t.rate)}/hr</option>)}</select><label htmlFor="tractor-duration">BOOKING LENGTH</label><select id="tractor-duration" value={hours} onChange={e=>setHours(Number(e.target.value))}>{TRACTOR_DURATIONS.map(d=><option value={d.hours} key={d.hours}>{d.label}</option>)}</select><div className={styles.estimateResult} aria-live="polite"><span>ESTIMATED LABOR</span><strong>{money(tractor.rate*hours)}</strong><small>{hours} hours × {money(tractor.rate)}/hour</small></div><p>Three-hour minimum. Mobilization, rented implements, materials, disposal and applicable tax are separate. Site access, slopes, terrain and equipment limits determine job suitability.</p><a className={styles.primaryButton} href="#contact" onClick={()=>chooseEstimate('Tractor & property service', `${tractor.name} — ${hours} hours at ${money(tractor.rate)}/hr: ${money(tractor.rate*hours)} estimated labor`)}>REQUEST TRACTOR ESTIMATE ↗</a></div>
        </div>
        <p className={styles.pricingNote}>All displayed prices are starting budgets or labor estimates, not binding quotes. Final pricing depends on site conditions, scope, materials, availability, travel and applicable taxes. Half-day and full-day bookings use the selected hourly rate.</p>
      </section>

      <section className={styles.partnerSection} id="partners">
        <div className={styles.partnerInner}><div className={styles.sectionLabel}><span>04</span> COLLABORATIVE BY DESIGN</div><div className={styles.partnerLayout}><div><h2>Built together.<br /><em>Better by nature.</em></h2><p>For hardscape contractors, builders, property managers and developers: we provide a botanical enhancement partner who can bring your built spaces to life without expanding your in-house crew.</p><a className={styles.lightButton} href="#contact" onClick={()=>{setRequestType('Contractor partnership');setEstimate('');}}>EXPLORE A PARTNERSHIP <span>↗</span></a></div><div className={styles.partnerSteps}><div><b>01</b><span>YOU BUILD THE STRUCTURE</span><p>Patios, pathways, walls, outdoor living and shared spaces.</p></div><div><b>02</b><span>WE DEVELOP THE BOTANICAL FINISH</span><p>Planting concepts, clear scopes and coordinated installations.</p></div><div><b>03</b><span>WE SUPPORT LONG-TERM CARE</span><p>Optional ongoing landscape stewardship through qualified partners.</p></div></div></div></div>
      </section>

      <section className={styles.fieldGuide} id="field-guide">
        <div className={styles.sectionLabel}><span>05</span> THE LOUDOG ACRES FIELD GUIDE</div>
        <div className={styles.sectionHeading}><h2>Cultivating knowledge.<br/><em>Cultivating land.</em></h2><p>A practical guide to beautiful, productive landscapes. Learn what to grow, where to grow it, and how to care for the land beneath it.</p></div>
        <div className={styles.guideGrid}>
          <article><img src="/loudogacres/peppers.webp" alt="Colorful peppers growing in a landscape planting" loading="lazy"/><div><small>01 / LIVING LANDSCAPES</small><h3>Beauty you can harvest.</h3><p>Edible landscaping integrates useful plants into the landscape you already have, rather than requiring a separate vegetable patch.</p><details><summary>What can I grow?</summary><p>Try thyme and oregano along sunny edges, peppers and chard among ornamental plantings, or blueberries where soil acidity and sunlight are suitable. Choose plants for your site, season and maintenance needs.</p></details><details><summary>What does the 30% approach mean?</summary><p>We consider roughly 30% living plant coverage within a defined landscape area where appropriate. It is a flexible design goal, not a requirement or budget percentage.</p></details><details><summary>Can I eat plants from an existing bed?</summary><p>Only harvest positively identified edible plants. Consider soil contamination, past pesticide use, pets and nearby runoff before selecting an edible planting location. Wash produce before eating.</p></details></div></article>
          <article><img src="/loudogacres/tractor.webp" alt="Loudog Acres compact tractor parked with forks" loading="lazy"/><div><small>02 / LAND STEWARDSHIP</small><h3>Start with the soil.</h3><p>Thoughtful stewardship protects the land while making it more useful. The right equipment and timing can make a difficult job manageable.</p><details><summary>Why test the soil?</summary><p>A soil test helps guide pH adjustments and fertilizer decisions. Different crops have different needs; blueberries, for example, prefer acidic soil.</p></details><details><summary>When should I till?</summary><p>Tilling can prepare new planting areas, but repeated disturbance can damage soil structure. Avoid working saturated soil and consider less disruptive methods for established beds.</p></details><details><summary>What can a compact tractor do?</summary><p>Brush cutting, moving mulch and gravel, preparing beds and light grading may be suitable, depending on access, slope, obstacles and equipment capacity.</p></details></div></article>
          <article><img src="/loudogacres/seedlings.webp" alt="Young plants growing in labeled seed trays" loading="lazy"/><div><small>03 / BOTANICAL KNOWLEDGE</small><h3>Know what you grow.</h3><p>Explore herbs, food crops and flowering botanicals through practical plant profiles and seasonal growing notes.</p><details><summary>Mint | Mentha species</summary><p>A fragrant culinary herb that often spreads aggressively. Grow in a container to limit spread, with suitable light and consistent moisture. Harvest clean leaves for culinary use.</p></details><details><summary>Rosemary | Salvia rosmarinus</summary><p>A sun-loving culinary herb that prefers well-drained soil. Winter hardiness varies by cultivar and local conditions.</p></details><details><summary>Wildflowers and pollinators</summary><p>Choose regionally suitable, noninvasive species that bloom at different times. Flowers can provide nectar and pollen, while varied plant structure offers habitat.</p></details></div></article>
        </div>
        <div className={styles.guideFilm}><div><small>FROM THE TOHISANE ENCYCLOPEDIA</small><h3>Botanical studies, in motion.</h3><p>Original botanical footage from TOHISANE. Educational material, not medical advice.</p></div><div className={styles.filmGrid}><figure><video controls playsInline preload="none" poster="/loudogacres/seedlings.webp" src="/loudogacres/mint.mp4"/><figcaption>Mint · TOHISANE Encyclopedia</figcaption></figure><figure><video controls playsInline preload="none" poster="/loudogacres/flowers.webp" src="/loudogacres/wildflowers.mp4"/><figcaption>Wildflowers · TOHISANE Encyclopedia</figcaption></figure></div></div>
        <div className={styles.guideAction}><h3>Ready to grow something useful?</h3><a className={styles.primaryButton} href="#landscape-estimator">EXPLORE LANDSCAPE OPTIONS ↗</a></div>
      </section>

      <section className={styles.aboutSection} id="about"><div className={styles.sectionLabel}><span>06</span> THE HEART OF LOUDOG ACRES</div><div className={styles.aboutContent}><img className={styles.founderPhoto} src="/loudogacres/founder.webp" alt="Founder and dog in a parked excavator" loading="lazy"/><div><h2>Rooted in place.<br /><em>Made to last.</em></h2><p>Loudog Acres is a woman-owned, founder-directed landscaping and property-services business based in the Cleveland–Chattanooga region. We pair a respect for native landscapes and local growing conditions with practical stewardship, creative vision and trusted professional partnerships.</p><p>From a single tractor day to a complete landscape enhancement, we believe care for the land should feel personal, capable and considered.</p></div></div></section>

      <section className={styles.contactSection} id="contact"><div className={styles.contactLeft}><div className={styles.sectionLabel}><span>07</span> START A CONVERSATION</div><h2>Tell us what<br /><em>you have in mind.</em></h2><p>Homeowner, property manager or contractor — share a little about the project and we'll take it from there.</p><div className={styles.contactNote}><strong>SERVICE AREA</strong><span>Cleveland, Chattanooga & nearby Southeast Tennessee communities</span></div><div className={styles.contactNote}><strong>HOW INQUIRIES WORK</strong><span>Your message is sent securely from this page straight to our inbox, and we reply to the email address you provide. Nothing is stored on the website.</span></div></div><form className={styles.form} onSubmit={handleSubmit} aria-busy={formStatus === 'sending'}><div className={styles.honeypot} aria-hidden="true"><label htmlFor="la-company">Company</label><input id="la-company" name="company" tabIndex={-1} autoComplete="off" /></div><label htmlFor="la-type">I'M INTERESTED IN</label><select id="la-type" value={requestType} onChange={e=>{setRequestType(e.target.value as RequestType);setEstimate('');}}>{requestTypes.map(t=><option key={t}>{t}</option>)}</select>{estimate && <div className={styles.selectedEstimate}><strong>YOUR SELECTED ESTIMATE</strong><p>{estimate}</p><button type="button" onClick={()=>setEstimate('')}>Clear selection</button></div>}<div className={styles.formPair}><div><label htmlFor="la-name">YOUR NAME</label><input required id="la-name" name="name" placeholder="Full name" /></div><div><label htmlFor="la-email">EMAIL</label><input required type="email" id="la-email" name="email" placeholder="you@example.com" /></div></div><label htmlFor="la-location">PROPERTY / PROJECT LOCATION</label><input id="la-location" name="location" placeholder="City or general area" /><label htmlFor="la-details">A LITTLE ABOUT YOUR PROJECT</label><textarea required rows={4} id="la-details" name="details" placeholder="What would you like to enhance, maintain, or prepare?" /><button className={styles.submitButton} type="submit" disabled={formStatus === 'sending'}>{formStatus === 'sending' ? 'SENDING…' : 'SEND INQUIRY'} <span>↗</span></button>{notice && <p role={formStatus === 'error' ? 'alert' : 'status'} className={`${styles.formNotice} ${formStatus === 'error' ? styles.formError : styles.formSuccess}`}>{notice}</p>}</form></section>
      <footer className={styles.footer}><div><strong>LOUDOG ACRES</strong><span>BESPOKE LANDSCAPING & PROPERTY SERVICES</span></div><p>Beautiful by Nature. Bountiful by Design.</p><small>© {new Date().getFullYear()} Loudog Acres · Southeast Tennessee</small></footer>
    </main>
  );
}
