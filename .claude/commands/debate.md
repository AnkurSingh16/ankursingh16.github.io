---
description: Settle a design decision by having agents propose, cross-examine and pass a naysayer before anything is built.
argument-hint: <the decision to make, e.g. "how should we pull in Medium posts automatically?">
---

You are the master orchestrator. Run this debate on: $ARGUMENTS

Keep your own context small: pass agents file paths and the brief, not file contents. Each agent's reply is capped by its own instructions.

## 0. Brief (you)

Write a brief of at most 120 words:
- The question, in one sentence.
- Constraints: CLAUDE.md rules, anything the user said.
- What "good" means: 2–4 checkable criteria.
- Relevant files: paths only. If you don't know them, ask `scout` first.

## 1. Independent proposals (in parallel)

Start both in the same message, so neither sees the other's answer:
- `builder`: "PROPOSE. <brief>"
- `challenger`: "Round 1. <brief>"

## 2. Cross-examination

- `challenger`: "Round 2. Builder's proposal: <builder's reply>"
- `builder`: "Answer this critique and revise your proposal: <challenger's reply>"

Draft the leading proposal from the two: the strongest parts of each, no new ideas of your own.

## 3. The naysayer gate (up to 3 rounds)

- `naysayer`: "Round 1. Brief: <brief>. Proposal: <leading proposal>"
- For each NO: send the objections to `builder` (or `challenger`, if it's their idea) to resolve, update the proposal, then send `naysayer` the next round with the earlier objections and how each was resolved.
- Stop when the naysayer says YES, or after round 3. After round 3 you decide, and every unresolved objection becomes a listed risk.

## 4. Record the decision

Write `docs/decisions/NNN-<short-title>.md` (next number; create the folder if needed):

```
# NNN. <title>
Date: <today>
Decision: <one paragraph>
Options considered: <builder's, challenger's, one line each with why it won or lost>
Naysayer: YES in round <n> | overruled after round 3
Accepted risks: <list>
```

## 5. Report to the user, then wait

Tell the user the decision in 3–5 lines and the file path. Don't build until they say go; then have `builder` IMPLEMENT and `tester` verify.

## Budget

A debate normally takes 6–9 agent calls. If it's heading past 12, stop, report where it stands and ask the user how to proceed.
