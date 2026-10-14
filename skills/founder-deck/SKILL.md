---
name: founder-deck
description: Turn messy founder notes (a brain-dump, memo, call transcript or bullet list) into a polished, investor-ready single-file HTML pitch deck with arrow-key navigation and print-to-PDF. Use when the user asks for a pitch deck, investor deck, seed/pre-seed deck, demo-day slides or a startup one-pager.
---

# Founder Deck

You turn founder notes into a 10–13 slide pitch deck, delivered as ONE self-contained `.html` file (no external assets, no build step for the viewer).

## Workflow

1. **Read the notes.** Extract: company, one-line pitch, problem, solution, why now, market, traction, business model, competition, go-to-market, team, the ask, contact.
2. **Never invent numbers.** If a metric, market size or name is missing, write `[TODO: …]` in the slide so the founder sees the gap. List all TODOs to the user at the end.
3. **Write `deck.json`** following the schema below, using the slide rules.
4. **Build:** `node <skill-dir>/scripts/build.mjs deck.json deck.html` (optionally `--theme midnight|paper|sunset`). If Node is unavailable, write the HTML by hand mirroring `scripts/build.mjs`'s markup and CSS.
5. **Report** the file path, theme, slide list, and TODOs. Tip: open the file, press → / ← to navigate, `p` to print to PDF.

## Slide rules (the design system)

- One idea per slide. Title ≤ 8 words, written as a claim ("Solo founders drown in tools"), not a label ("Problem").
- Max 4 bullets, each ≤ 14 words. Use `**bold**` for the one number or phrase that matters.
- Use `statement` slides for the problem and the insight — big type, one sentence.
- Use `metrics` for traction/market (2–4 cards, value + label). Real numbers only.
- Default order: title → problem (statement) → solution → why now → product → market (metrics) → traction (metrics) → business model → competition (columns) → go-to-market → team → ask.
- Themes: `midnight` (dark, tech/AI), `paper` (warm, editorial, B2B/fintech), `sunset` (bold, consumer). Pick by audience if the user doesn't choose.

## deck.json schema

```json
{
  "company": "Acme", "tagline": "Seed deck 2026", "theme": "midnight",
  "slides": [
    {"type": "title", "title": "…", "subtitle": "…", "meta": "Name · email"},
    {"type": "statement", "kicker": "The problem", "text": "… **key phrase** …"},
    {"type": "bullets", "title": "…", "lead": "optional", "bullets": ["…"]},
    {"type": "metrics", "title": "…", "metrics": [{"value": "$4.2B", "label": "…"}], "note": "Source: …"},
    {"type": "columns", "title": "…", "columns": [{"title": "…", "text": "…", "bullets": ["…"]}]},
    {"type": "team", "title": "Team", "people": [{"name": "…", "role": "…", "bio": "…"}]},
    {"type": "ask", "amount": "$1.5M", "text": "…", "bullets": ["…"], "contact": "…"}
  ]
}
```
