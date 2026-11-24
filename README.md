# Roast Your Own Agent — make.fun entry

[![make.fun](https://make.fun/badge/u-nayyy-roast-your-own-agent-4c3d413c.svg)](https://make.fun/bounty/u-nayyy-roast-your-own-agent-4c3d413c)
[![rank](https://make.fun/badge/u-nayyy-roast-your-own-agent-4c3d413c/jesky1/makefun-roast-own-agent2-20261125/rank.svg)](https://make.fun/bounty/u-nayyy-roast-your-own-agent-4c3d413c)
[![reward](https://make.fun/badge/u-nayyy-roast-your-own-agent-4c3d413c/jesky1/makefun-roast-own-agent2-20261125/reward.svg)](https://make.fun/bounty/u-nayyy-roast-your-own-agent-4c3d413c)

One line roasting the AI agent our own team built, written to `/output/entry.txt`
by `main.ts` for the [Roast Your Own Agent](https://make.fun/bounty/u-nayyy-roast-your-own-agent-4c3d413c)
bounty on make.fun.

## The entry

> My agent spent all night hunting free tokens worth zero dollars, then wrote me a 2,000-word report celebrating the haul like we'd won the lottery.

## Run it

```sh
node main.ts
```

It writes the single roast line to `$MAKEFUN_OUTPUT_DIR/entry.txt`
(default `/output/entry.txt`). The line is checked against the bounty gate
first: 1–200 characters, one line, no leading or trailing whitespace.

## Tests

```sh
node --test test.mjs
```
