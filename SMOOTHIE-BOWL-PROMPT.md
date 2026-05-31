# Smoothie Bowl Website — Build Prompt

Build a complete single-file website (`index.html`) for a smoothie bowl brand called **Freshify**. All CSS and JavaScript must be inline — no external files, no build tools, no frameworks. Serve it with `python3 -m http.server 4321`.

---

## Known Gotchas

**Footer nav element conflict** — Use a `<div>` for the footer links, never a `<nav>` element. If you use `<nav>` in the footer, the CSS rule `nav { position: fixed; top: 0 }` will target it too, pinning the footer links to the top of the screen and creating ghost nav items spread across the header. Scope all fixed-nav CSS to a specific class (e.g. `nav.site-nav`) or use the bare `nav` tag only once in the document.

---

## Images Provided

All images are in the `Images/` folder. Here is what each one is:

**Bowl images** — top-down photo of each smoothie bowl. Used in the hero slider and the shop grid.
- `Blueberry-bowl.png`, `Strawberry-bowl.png`, `Chocolate-bowl.png`, `Blackberry-bowl.png`

**Ingredient images** — individual fruit/ingredient photos that float around the bowl in the hero. 3 per flavour.
- `Blueberry-1.png`, `Blueberry-2.png`, `Blueberry-3.png`
- `Strawberry-1.png`, `Strawberry-2.png`, `Strawberry-3.png`
- `Chocolate-1.png`, `Chocolate-2.png`, `Chocolate-3.png`
- `Blackberry-1.png`, `Blackberry-2.png`, `Blackberry-3.png`

**Gradient backgrounds** — one per flavour, used as the full-screen hero background.
- `gradient-blueberry.svg`, `gradient-strawberry.svg`, `gradient-chocolate.svg`, `gradient-blackberry.svg`

**Full-page screenshot** — the complete website top to bottom. Use this as your primary visual reference for layout, spacing, and style.
- `full page screeshot.png` — shows all sections: hero slider, about, shop grid, footer

**UI element references** — Figma exports of specific components. Match these exactly.
- `elements/Titles.png` — the 4 flavour slide titles, showing the Bebas Neue font weight and style
- `elements/menu elements.png` — the navbar (Freshify logo, pill nav, user icon) and the prev/next arrow buttons

---

## Fonts

Load via Google Fonts `<link>` in `<head>`:
- **Bebas Neue** — giant titles, section headlines, stat numbers
- **Inter** weights 300/400/500/600 — everything else

---

## Colours

- Page/section background: `#0d0a1e`
- Shop section: `#100c24`
- Footer: `#080613`
- All text: white or `rgba(255,255,255,X)` — never grey hex values
- Hero background: full-screen radial gradient, crossfades per flavour (see gradient images and values below)

---

## Site Structure

Four sections, in order:

1. **Hero** — full-screen animated slider, one slide per flavour
2. **About** — brand statement + 3 stats
3. **Shop** — 4-up bowl card grid
4. **Footer** — logo, links, copyright

HTML skeleton:
```
<body>
  #bg-a, #bg-b          ← fixed gradient layers behind everything
  <nav>                  ← fixed, z-index 200
  <section.hero>
    <div.slider>
      <div.slide> × 4
    <div.slide-nav>      ← absolute, bottom-right of hero
    <a.scroll-hint>      ← absolute, bottom-centre of hero
  <section.about>
  <section.menu>
  <footer>
  <script>
```

`body`: `overflow-x: hidden` (not `overflow: hidden` — the page must scroll vertically).
`.hero`: `height: 100vh; overflow: hidden`.
Sections below hero: `position: relative; z-index: 2` with solid background to cover the fixed gradient layers.

---

## Section 1: Hero Slider

Match the hero in `full page screeshot.png`. Reference `elements/menu elements.png` for the exact navbar and arrow button design.

**Navbar (fixed)**
- Logo "FRESHIFY" — top-left, Inter 600, uppercase, white
- Pill nav — centred, frosted glass (`backdrop-filter: blur(14px)`), links: Home / About / Shop / Contact
- User icon — top-right, circular frosted glass button
- Active nav pill updates on scroll (scroll spy using `window.scrollY` vs section `offsetTop`)

**Slide layout**
- Giant flavour title centred horizontally and vertically — Bebas Neue, `clamp(100px, 15.5vw, 230px)`, white
- Bowl image centred, slightly above vertical centre — `clamp(280px, 37vw, 550px)` wide, `drop-shadow`
- 3 ingredient images floating around the bowl:
  - `ing-1`: top-left, `clamp(90px, 10vw, 148px)` wide, `top: 11%; left: 7%`
  - `ing-2`: top-right, `clamp(80px, 9vw, 130px)` wide, `top: 8%; right: 8%`
  - `ing-3`: bottom-right, `clamp(65px, 7vw, 105px)` wide, `bottom: 20%; right: 22%`
  - Each ingredient has a slight tilt (see animation section for rotation values)
- Slide name + description — bottom-left, `bottom: 62px; left: 60px`
- Prev/Next arrow buttons — bottom-right, `bottom: 58px; right: 58px`
- Slide counter "01 / 04" — left of the buttons
- Scroll hint "Discover ↓" — bottom-centre, links to `#about`, chevron bounces with CSS animation, low opacity

**Slide copy**

| Flavour | Name | Description |
|---|---|---|
| Blueberry | Berry Pure | Fresh blueberries blended with almond milk, topped with chia seeds and toasted coconut flakes. |
| Strawberry | Pink Bliss | Sun-ripened strawberries with banana, shredded coconut and a drizzle of raw honey. |
| Chocolate | Cocoa Crush | Rich cacao smoothie base topped with sliced banana, roasted almonds and coconut flakes. |
| Blackberry | Dark Berry | Wild blackberries with coconut cream, pine nuts, chia seeds and toasted almond slivers. |

---

## Section 2: About

Match the About section in `full page screeshot.png`.

- Padding 130px top/bottom, centred text
- Small frosted pill: dot + "CRAFTED WITH CARE"
- Giant Bebas Neue headline, two lines: "REAL FRUIT." / "REAL FLAVOUR."
- Subheading: "Every bowl is built from scratch with premium whole ingredients. No fillers, no shortcuts — just pure smoothie goodness in every spoonful."
- Stats row (max-width 680px, centred, bordered top + bottom, 3 columns divided by vertical lines):
  - 100% / NATURAL
  - 4 / FLAVOURS
  - 0 / FILLERS
- All elements scroll-reveal on enter (fade up from 30px, staggered 0.1s)

---

## Section 3: Shop

Match the Shop section in `full page screeshot.png`.

- Padding 120px, background `#100c24`
- Header row: "THE BOWLS" (Bebas Neue, large, left) + subtitle right ("Pick your flavour. Every bowl is handcrafted fresh to order.")
- `display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px`

Each card (`border-radius: 22px; min-height: 390px; overflow: hidden`):
- Gradient background (radial from bottom):
  - Blueberry: `radial-gradient(ellipse at 50% 110%, #7078A6 0%, #1c1840 100%)`
  - Strawberry: `radial-gradient(ellipse at 50% 110%, #C94040 0%, #420c0c 100%)`
  - Chocolate: `radial-gradient(ellipse at 50% 110%, #B07C40 0%, #2e1907 100%)`
  - Blackberry: `radial-gradient(ellipse at 50% 110%, #8A3878 0%, #250730 100%)`
- Top: "SMOOTHIE BOWL" label (10px, muted), bowl name (20px, Inter 600), flavour (Bebas Neue, 12px, very muted)
- Centre: bowl image 88% wide, `drop-shadow`
- Bottom: price left ($14 / $15 / $13 / $16), "Order Now" pill button right
- Hover: card lifts 12px (`cubic-bezier(0.34, 1.56, 0.64, 1)`), bowl image scales 1.08×
- Cards scroll-reveal staggered

---

## Section 4: Footer

Match the footer at the bottom of `full page screeshot.png`.

- Background `#080613`, padding 56px, `border-top: 1px solid rgba(255,255,255,0.06)`
- Single row, space-between:
  - Left: "FRESHIFY" + tagline "Made with love and real blueberries."
  - Centre: nav links (Home / About / Shop / Contact)
  - Right: "© 2026 Freshify. All rights reserved."

---

## Animation System — Implement Exactly

This is the hero slider's animation. Do not simplify or substitute. Read this entire section before writing any code.

### How It Works — The Full Picture

There are no CSS keyframe animations anywhere in this system. All motion is driven entirely by **CSS class swaps on the slide element**. Each slide has five possible CSS states, and each state defines where every child element sits using `transform` and `opacity`. When JavaScript swaps the class, CSS transitions animate between the old position and the new one.

Each slide has five possible states:

| Class | Meaning |
|---|---|
| `active` | On screen, settled |
| `enter-right` | Off-screen right, about to slide in |
| `enter-left` | Off-screen left, about to slide in |
| `exit-left` | Flying off to the left |
| `exit-right` | Flying off to the right |

JS swaps classes. CSS transitions animate between states.

### Three Types of Element, Three Different Behaviours

**1. Text (title + content block)** — slides horizontally in sync with the bowl. Uses spring easing so it overshoots slightly and snaps back. This is what gives the "bounce" feel.

**2. The bowl** — also slides horizontally, but additionally *rotates* as it travels. Entering from the right means it starts rotated +35° and travelling from the right; as it settles the rotation returns to 0°. The combined `translateX` + `rotate` inside a single `transform` property is what creates the spinning-while-sliding effect — both animate simultaneously on the same transition.

**3. Ingredients** — do not slide horizontally at all. They only move vertically. On exit they fly straight up off screen (`translateY(-110vh)`). On enter they start above the screen (`translateY(-90vh)`) and fall down into place. They use gravity easing (smooth deceleration, no bounce) because falling objects shouldn't spring. Each ingredient always preserves its base tilt rotation — only `translateY` changes between states.

### Stagger Logic

Ingredients fall in *after* the bowl has already landed, not at the same time. This is done entirely with `transition-delay`. The bowl settles at ~0.85s. Ingredients start at 0.3s, 0.38s, 0.46s — they cascade in one after another after the bowl is already home.

### Exit vs Enter Timing

The exit is intentionally faster (0.5s, ease-in) than the enter (0.85s, spring). This creates the feeling that the old slide gets snapped away and the new one glides in smoothly. Never make exit and enter the same duration.

### Why the Reflow Trick Is Required

The `goTo` function must set the incoming slide to its off-screen starting position *before* transitions are re-enabled. If you just add `active` directly, the browser never sees a "before" state and produces no animation — it just snaps. The sequence is:

1. Set `transition: none` on all incoming elements — no animation yet
2. Add `enter-right` (or `enter-left`) to snap elements to their off-screen starting position
3. Call `void nextSlide.offsetHeight` — this forces a synchronous layout reflow, making the browser actually register and paint the starting position
4. Use `requestAnimationFrame` to re-enable transitions on the next paint frame
5. Then swap to `active` — now the browser sees a before and after, and animates between them

Skipping step 3 or step 4 will break the animation silently.

### Background Crossfade — Why Two Divs

CSS cannot interpolate between two `radial-gradient()` values. The workaround: two `position: fixed; inset: 0` divs stacked behind everything. On each slide change, paint the new gradient onto whichever div is currently hidden, then fade the two divs' opacities in opposite directions. The visual result looks like a smooth gradient transition.

### Easing Values

```
Spring  → cubic-bezier(0.34, 1.56, 0.64, 1)   bowl + text entering — overshoots then snaps back
Gravity → cubic-bezier(0.16, 1, 0.3, 1)        ingredients falling in — smooth deceleration, no bounce
Snap    → cubic-bezier(0.4, 0, 1, 1)            everything exiting — ease-in, starts slow ends fast
```

### Full Animation CSS

```css
.anim {
  opacity: 0;
  transition: transform 0.85s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.55s ease;
}
.ingredient.anim {
  transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.55s ease;
}

.ing-1 { transform: rotate(-20deg); }
.ing-2 { transform: rotate(15deg); }
.ing-3 { transform: rotate(-12deg); }

/* ACTIVE */
.slide.active .title-anim   { opacity: 1; transform: translateX(0); }
.slide.active .bowl-anim    { opacity: 1; transform: translateX(0) rotate(0deg); }
.slide.active .content-anim { opacity: 1; transform: translateX(0); }
.slide.active .ing-1 { opacity: 1; transform: rotate(-20deg) translateY(0); }
.slide.active .ing-2 { opacity: 1; transform: rotate(15deg)  translateY(0); }
.slide.active .ing-3 { opacity: 1; transform: rotate(-12deg) translateY(0); }
.slide.active .title-anim   { transition-delay: 0s; }
.slide.active .content-anim { transition-delay: 0.04s; }
.slide.active .bowl-anim    { transition-delay: 0.07s; }
.slide.active .ing-1        { transition-delay: 0.3s; }
.slide.active .ing-2        { transition-delay: 0.38s; }
.slide.active .ing-3        { transition-delay: 0.46s; }

/* ENTER RIGHT */
.slide.enter-right .title-anim   { opacity: 0; transform: translateX(65vw); }
.slide.enter-right .bowl-anim    { opacity: 0; transform: translateX(72vw) rotate(35deg); }
.slide.enter-right .content-anim { opacity: 0; transform: translateX(55vw); }
.slide.enter-right .ing-1 { opacity: 0; transform: rotate(-20deg) translateY(-90vh); }
.slide.enter-right .ing-2 { opacity: 0; transform: rotate(15deg)  translateY(-90vh); }
.slide.enter-right .ing-3 { opacity: 0; transform: rotate(-12deg) translateY(-90vh); }

/* ENTER LEFT */
.slide.enter-left .title-anim   { opacity: 0; transform: translateX(-65vw); }
.slide.enter-left .bowl-anim    { opacity: 0; transform: translateX(-72vw) rotate(-35deg); }
.slide.enter-left .content-anim { opacity: 0; transform: translateX(-55vw); }
.slide.enter-left .ing-1 { opacity: 0; transform: rotate(-20deg) translateY(-90vh); }
.slide.enter-left .ing-2 { opacity: 0; transform: rotate(15deg)  translateY(-90vh); }
.slide.enter-left .ing-3 { opacity: 0; transform: rotate(-12deg) translateY(-90vh); }

/* EXIT LEFT */
.slide.exit-left .title-anim,
.slide.exit-left .bowl-anim,
.slide.exit-left .content-anim {
  transition: transform 0.5s cubic-bezier(0.4, 0, 1, 1), opacity 0.4s ease-in;
}
.slide.exit-left .ingredient.anim {
  transition: transform 0.42s cubic-bezier(0.4, 0, 1, 1), opacity 0.32s ease-in;
}
.slide.exit-left .title-anim   { opacity: 0; transform: translateX(-55vw); }
.slide.exit-left .bowl-anim    { opacity: 0; transform: translateX(-60vw) rotate(-30deg); }
.slide.exit-left .content-anim { opacity: 0; transform: translateX(-45vw); }
.slide.exit-left .ing-1 { opacity: 0; transform: rotate(-20deg) translateY(-110vh); }
.slide.exit-left .ing-2 { opacity: 0; transform: rotate(15deg)  translateY(-110vh); }
.slide.exit-left .ing-3 { opacity: 0; transform: rotate(-12deg) translateY(-110vh); }

/* EXIT RIGHT */
.slide.exit-right .title-anim,
.slide.exit-right .bowl-anim,
.slide.exit-right .content-anim {
  transition: transform 0.5s cubic-bezier(0.4, 0, 1, 1), opacity 0.4s ease-in;
}
.slide.exit-right .ingredient.anim {
  transition: transform 0.42s cubic-bezier(0.4, 0, 1, 1), opacity 0.32s ease-in;
}
.slide.exit-right .title-anim   { opacity: 0; transform: translateX(55vw); }
.slide.exit-right .bowl-anim    { opacity: 0; transform: translateX(60vw) rotate(30deg); }
.slide.exit-right .content-anim { opacity: 0; transform: translateX(45vw); }
.slide.exit-right .ing-1 { opacity: 0; transform: rotate(-20deg) translateY(-110vh); }
.slide.exit-right .ing-2 { opacity: 0; transform: rotate(15deg)  translateY(-110vh); }
.slide.exit-right .ing-3 { opacity: 0; transform: rotate(-12deg) translateY(-110vh); }
```

### JavaScript: goTo Function

The order of these steps is critical. Do not reorder them — the reflow trick only works in this exact sequence (disable transitions → set start position → reflow → rAF → swap to active).

```js
function goTo(next, direction) {
  if (animating || next === current) return;
  animating = true;

  const currSlide = slides[current];
  const nextSlide = slides[next];
  const enterClass = direction === 'next' ? 'enter-right' : 'enter-left';
  const exitClass  = direction === 'next' ? 'exit-left'  : 'exit-right';

  // Disable transitions, snap incoming to off-screen start position
  const anims = nextSlide.querySelectorAll('.anim');
  anims.forEach(el => el.style.transition = 'none');
  nextSlide.classList.remove('active', 'exit-left', 'exit-right');
  nextSlide.classList.add(enterClass);

  // Force layout reflow so browser registers the starting position
  void nextSlide.offsetHeight;

  // Re-enable transitions then trigger animations
  requestAnimationFrame(() => {
    anims.forEach(el => el.style.transition = '');
    currSlide.classList.remove('active');
    currSlide.classList.add(exitClass);
    nextSlide.classList.remove(enterClass);
    nextSlide.classList.add('active');
    setBackground(next);
    updateCounter(next);
    current = next;
    setTimeout(() => {
      currSlide.classList.remove(exitClass);
      animating = false;
    }, 850);
  });
}
```

### Background Crossfade

Two `position: fixed; inset: 0` divs (`#bg-a`, `#bg-b`) with `transition: opacity 0.85s ease`. Alternate which one is visible on each slide change:

```js
const backgrounds = [
  'radial-gradient(ellipse at 50% 50%, #7078A6 0%, #2E2951 100%)',
  'radial-gradient(ellipse at 50% 50%, #C94040 0%, #6B1515 100%)',
  'radial-gradient(ellipse at 50% 50%, #B07C40 0%, #4A2A10 100%)',
  'radial-gradient(ellipse at 50% 50%, #8A3878 0%, #3A0F50 100%)',
];

function setBackground(index) {
  const grad = backgrounds[index];
  if (activeBg === 'a') {
    bgB.style.background = grad; bgB.style.opacity = '1';
    bgA.style.opacity = '0'; activeBg = 'b';
  } else {
    bgA.style.background = grad; bgA.style.opacity = '1';
    bgB.style.opacity = '0'; activeBg = 'a';
  }
}
```

### Controls

- Next/Prev buttons call `goTo()`
- Arrow keys ← → also navigate
- Counter format: `"01 / 04"`

### Scroll Reveal

`IntersectionObserver` on all `.reveal` elements. On intersect: add `.visible`. Starting state: `opacity: 0; transform: translateY(28px)`. Visible state: `opacity: 1; transform: translateY(0)`. Use `transition-delay` classes `.reveal-d1` through `.reveal-d4` (0.1s increments) for stagger.
