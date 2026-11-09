# The agent team

These agents run in **Claude Code** (terminal, desktop or web) when you open this repo. Claude Code picks up `.claude/agents/` and `.claude/commands/` automatically.

```
                    You
                     │
            Orchestrator (your main Claude session)
     ┌──────────┬────┴─────┬──────────┬──────────┐
   scout     builder   challenger  naysayer    tester
  (Haiku)   (Sonnet)    (Sonnet)   (Sonnet)    (Haiku)
  finds     proposes,   rival      says NO     runs checks,
  things    builds      proposal   until it's  reports
                                   earned      failures
```

| Agent | Model | Can edit? | Job |
|---|---|---|---|
| Orchestrator | whatever your session runs | yes | Plans, delegates, decides, talks to you |
| `scout` | Haiku | no | Finds where things are; returns paths, not files |
| `builder` | Sonnet | yes | Proposes in debates; implements changes |
| `challenger` | Sonnet | no | Designs a rival solution blind, then cross-examines the builder |
| `naysayer` | Sonnet | no | Default answer NO; lists blockers and what would resolve each |
| `tester` | Haiku | no | Runs `npm run check`; reports only failures |

## Two ways to work

**Everyday changes** (copy, prices, styling, small features): just ask. The orchestrator uses `scout` to look, `builder` to change, `tester` to check.

**Decisions with trade-offs** (architecture, a new feature's design, picking a library):

```
/debate how should we pull in the latest Medium posts automatically?
```

1. `builder` and `challenger` each propose, in parallel, without seeing the other's.
2. They cross-examine each other's proposals.
3. `naysayer` says NO, with specific blockers, until each one is resolved. Up to 3 rounds; then the orchestrator decides and records what's unresolved as accepted risks.
4. The decision is written to `docs/decisions/`, so nobody spends tokens re-arguing it later.
5. Nothing is built until you say go.

## About tokens: what saves them and what doesn't

- **Saves:** routine work runs on cheaper models (Haiku for searching and test runs, Sonnet for building), so your main session's more expensive context stays small. `CLAUDE.md` gives every session the map up front instead of re-exploring. Short, fixed reply formats keep agent output small. Decision records stop repeat debates.
- **Costs more:** a debate runs 6–9 agent calls, so it uses more tokens than one agent deciding alone. That's the price of having ideas fight it out, so use `/debate` for real decisions, not edits.

## Using the team on other projects

- **This team everywhere:** copy `.claude/agents/*.md` to `~/.claude/agents/` and `.claude/commands/debate.md` to `~/.claude/commands/`. Per-project agents with the same name override the global ones.
- **Per project:** copy the `.claude/` folder and write a short `CLAUDE.md` with that project's map, commands and rules. The agents read it first.
