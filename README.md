# founder-deck-skill

**Turn a messy founder brain-dump into an investor-ready HTML pitch deck.** One agent skill, built and tested with Claude Code (it should also work with Codex, Gemini CLI and other agents that read `SKILL.md`, but those are untested).

**[▶ Live example deck](https://omrigotlieb.github.io/founder-deck-skill/examples/lumen-midnight.html)** (arrow keys to navigate)

![Brain-dump to deck](assets/demo.gif)

- 📝 Paste notes, a memo or a call transcript → get a 10–13 slide deck
- 📦 **One self-contained `.html` file**: no dependencies, works offline, easy to email
- ⌨️ Arrow keys / click to navigate · `p` to print to PDF
- 🎨 3 themes: `midnight`, `paper`, `sunset`
- 🚫 Never invents numbers: missing data becomes a visible `[TODO]`

## Install (one line)

```bash
git clone --depth 1 https://github.com/Omrigotlieb/founder-deck-skill /tmp/fds && mkdir -p ~/.claude/skills && cp -r /tmp/fds/skills/founder-deck ~/.claude/skills/
```

For other agents, copy `skills/founder-deck` into that agent's skills folder (or the project's `.claude/skills/`).

## Use

In your agent:

> Make me a pitch deck from these notes: …

Or run the builder yourself (Node 18+, zero deps):

```bash
node skills/founder-deck/scripts/build.mjs examples/lumen.json deck.html --theme paper
```

## Themes

![midnight · paper · sunset](assets/themes.png)

| midnight | paper | sunset |
|---|---|---|
| dark, tech / AI | warm editorial, B2B / fintech | bold, consumer |

## Example

- Input: [`examples/notes.md`](examples/notes.md) (raw brain-dump)
- Structured: [`examples/lumen.json`](examples/lumen.json)
- Output: [`lumen-midnight.html`](examples/lumen-midnight.html) · [`lumen-paper.html`](examples/lumen-paper.html) · [`lumen-sunset.html`](examples/lumen-sunset.html) ([open live](https://omrigotlieb.github.io/founder-deck-skill/))

## Slide types

`title`, `statement`, `bullets`, `metrics`, `columns`, `team`, `ask`. See the schema and design rules in [`SKILL.md`](skills/founder-deck/SKILL.md).

## More from me

- [claude-md-doctor](https://github.com/Omrigotlieb/claude-md-doctor): lint and score your CLAUDE.md out of 100
- [mcp-solo-founder](https://github.com/Omrigotlieb/mcp-solo-founder): MCP server for running a one-person company
- [awesome-claude-skills-gallery](https://github.com/Omrigotlieb/awesome-claude-skills-gallery): see what agent skills produce before installing
- [ai-skills](https://github.com/Omrigotlieb/ai-skills): CLAUDE.md templates, skills, MCP servers and hooks
- [awesome-anthropic](https://github.com/Omrigotlieb/awesome-anthropic): daily-updated Anthropic / Claude resources

If this is useful, a ⭐ helps other people find it.

## License

MIT · Made by the [Guti AI](https://gutiailabs.com) team, a calm AI workspace for solo founders.
