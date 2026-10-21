---
name: Roy Sheppard
description: A freelance web designer's working sketchbook: cream paper, ink type, hand-drawn marks and one coral accent.
colors:
  paper-cream: "#faf9f5"
  paper-tan: "#f3efe3"
  paper-white: "#fffdf8"
  ink: "#17171a"
  ink-muted: "#6e6a5d"
  ink-muted-strong: "#514e44"
  ink-muted-soft: "#8a8676"
  rule-cream: "#ece6d8"
  rule-tan: "#dfd8c4"
  coral: "#ff5d39"
  coral-text: "#c9300e"
  coral-wash: "#fceee9"
  highlighter: "#d4f24a"
typography:
  display:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.5rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "clamp(1.875rem, 3vw, 2.625rem)"
    fontWeight: 600
    lineHeight: 1.1
  title:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.3
  body:
    fontFamily: "Space Grotesk, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "IBM Plex Mono, monospace"
    fontSize: "0.8125rem"
    fontWeight: 500
    letterSpacing: "0.06em"
  note:
    fontFamily: "Caveat, cursive"
    fontSize: "1.25rem"
    lineHeight: 1
rounded:
  sm: "6px"
  md: "12px"
  card: "20px"
  pill: "999px"
spacing:
  gutter-mobile: "24px"
  gutter-tablet: "40px"
  gutter-desktop: "140px"
  band-mobile: "56px"
  band-desktop: "100px"
components:
  button-primary:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper-cream}"
  button-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper-cream}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  card-paper:
    backgroundColor: "{colors.paper-white}"
    rounded: "{rounded.card}"
  tag:
    textColor: "{colors.ink-muted-strong}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
---

# Design System: Roy Sheppard

## Overview

**Creative North Star: "The Working Sketchbook"**

The site is a designer's notebook that happens to be a website. Pages are sheets of cream paper separated by thin tan rules; type is dark ink; the only colour is a single coral and a lime highlighter used the way a pen would be. Roy himself appears as a hand-drawn character and the supporting drawings are ink and pencil hatching on paper, so the interface and the artwork share one material.

It is warm and plain-spoken for non-technical owners of small businesses. Nothing is clever for its own sake: pill buttons, soft cards, mono labels and generous whitespace carry the page, and the drawings do the personality.

**Key Characteristics:**
- Cream and tan paper bands, alternating down the page.
- One coral accent and one lime highlighter, both rare.
- Space Grotesk for voice, IBM Plex Mono for labels, Caveat for the occasional handwritten note.
- Hand-drawn character and spot illustrations, never stock imagery or 3D.
- Soft, tinted shadows only where something is lifted off the paper.

## Colors

A warm paper palette with ink text and a single coral accent.

### Primary
- **Marker Coral** (#ff5d39): the accent. Filled buttons, tick badges, callout arrows, the closing call-to-action band and underline accents. Text on it is always ink.
- **Coral Print** (#c9300e): coral as text on paper (eyebrows, active nav, links on hover). Darker so it passes contrast on cream.
- **Highlighter Lime** (#d4f24a): the marker-pen highlight behind one phrase of a heading, and text selection. Never on the character.

### Neutral
- **Sketchbook Cream** (#faf9f5): the page background and the raised bands.
- **Tan Page** (#f3efe3): alternating section bands.
- **Fresh Paper** (#fffdf8): lifted cards, panels and dropdowns.
- **Ink** (#17171a): all headings, body on cream and filled dark buttons.
- **Soft Graphite** (#514e44): secondary body text.
- **Pencil Grey** (#6e6a5d): labels, breadcrumbs and nav items; a lighter #8a8676 is used for the faintest hints and borders.
- **Cream Rule** (#ece6d8) and **Tan Rule** (#dfd8c4): 1px dividers on cream and tan respectively.

### Named Rules
**The One Pen Rule.** Coral is the only accent colour and appears on a small share of any screen: a button, a mark, a label. If two coral things compete, one of them is wrong.
**The Paper Skin Rule.** The illustrated character wears no colour and his skin is the page colour. Colour on a drawing belongs to props and callouts only.

## Typography

**Display Font:** Space Grotesk (with sans-serif)
**Body Font:** Space Grotesk
**Label/Mono Font:** IBM Plex Mono
**Hand Font:** Caveat

**Character:** A friendly geometric grotesk with a little quirk, paired with a mono used for navigation and labels so small text reads as annotation rather than interface chrome.

### Hierarchy
- **Display** (500, 36 to 56px, 1.08, -0.01em): page titles, with a lime highlight on one phrase.
- **Headline** (600, 30 to 42px, 1.1): section headings.
- **Title** (700, 20 to 24px, 1.3): card and row titles.
- **Body** (400, 16 to 18px, 1.6): copy in Soft Graphite, capped near 60 to 65ch.
- **Label** (mono 500, 13px, 0.06em, uppercase): eyebrows and nav items.
- **Note** (Caveat, 20px): handwritten "learn more" links and the signature.

### Named Rules
**The Annotation Rule.** Mono is for labels and navigation only, never for paragraphs.

## Layout

Full-width bands stacked down the page, each with its own paper tone and a 1px rule at its top edge. Content sits inside generous side gutters (24px on phones, 40px on tablets, 140px on desktop; the header uses 80px). Sections breathe: roughly 56px of vertical padding on mobile and 100px on desktop. Layouts are asymmetric and left-weighted (copy on the left, drawing or detail on the right) and collapse to a single column on phones. Rows of three equal cards are avoided on content pages in favour of divided rows.

## Elevation & Depth

Paper layering. Depth mostly comes from tone changes between cream and tan bands and 1px tan rules. Shadows appear only on something lifted off the paper: taped cards, the nav dropdown and the pop-out pieces on case studies. They are soft, offset downward and tinted with ink, never a hard offset.

### Shadow Vocabulary
- **Lifted card** (`box-shadow: 0 14px 26px -16px rgba(23,23,26,0.3)`): the taped service cards, deepening on hover.
- **Dropdown** (`box-shadow: 0 18px 32px -18px rgb(23 23 26 / 0.35)`): the nav services panel.
- **Pop-out stack** (`0 2px 4px / 0 14px 28px / 0 36px 72px` at 6, 12, 16% ink): case-study pieces that lift off the page.

### Named Rules
**The Lift Only When Lifted Rule.** A shadow means the thing sits above the paper. Flat content gets a rule, not a shadow.

## Shapes

Soft and consistent: pills (999px) for every button, tag and form pill; 20px for cards; 12px for dropdown panels and 6 to 8px for small items inside them. Cards may tilt a degree or two with a strip of tape on one corner. Illustrations are ink outlines with pencil hatching on transparent backgrounds.

## Components

### Buttons
- **Shape:** full pill (999px).
- **Primary:** coral fill, ink text, 14px by 28px, semibold. Hover inverts to ink fill with cream text; press scales to 0.97.
- **Dark:** ink fill, cream text; hover turns coral with ink text. Used on cream pages.
- **Inverse:** ink on the coral call-to-action band.
- **Underline link:** semibold ink text with a 1.5px ink underline; hover turns Coral Print.

### Cards / Containers
- **Corner Style:** 20px (rounded-card) or the smaller 6 to 12px inside panels.
- **Background:** Fresh Paper on tan, white or tan on cream.
- **Shadow Strategy:** only the lifted vocabulary above; most rows have none.
- **Border:** 1px Tan Rule.

### Tags
- **Style:** pill, dashed Pencil Grey border, mono 12 to 13px, Soft Graphite text.

### Navigation
- Mono uppercase 13px in Pencil Grey, turning Coral Print on hover; the free-review item is always Coral Print. "Let's talk" is an ink-underlined mono link. The Services item opens a Fresh Paper panel of the three services with drawn illustrations. On phones the menu is a paper panel below the header with an expandable Services list.

### Signature Component: Highlighted Heading
One phrase of a page title sits on a slightly rotated lime marker swipe, as if highlighted by hand.

## Do's and Don'ts

### Do:
- **Do** alternate Sketchbook Cream and Tan Page bands, with a 1px Tan Rule between them.
- **Do** keep ink text on coral; Coral Print is for coral text on paper.
- **Do** use a drawn illustration from the existing set before reaching for anything else.
- **Do** keep every button a pill and every card at 20px.
- **Do** respect reduced motion; motion is short, ease-out and always optional.

### Don't:
- **Don't** put colour on the character, tint his skin, or draw him without the master sheet.
- **Don't** use gradients, glass, hard offset shadows or neon glows.
- **Don't** use stock photography, 3D renders or emoji as decoration.
- **Don't** put long paragraphs in mono, or use Caveat for anything but short notes.
- **Don't** add a second accent colour.
