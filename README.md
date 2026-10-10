# PolicyPilot

PolicyPilot is an AI-powered DeFi portfolio management agent built on Solana.

Users describe portfolio policies in plain English.

Example:

"Keep 40% USDC and 60% SOL"

PolicyPilot converts policies into structured allocations, evaluates compliance, analyzes portfolio risk, generates recommendations, explains its reasoning, and previews potential trades.

---

## Features

### Wallet Integration

- Phantom Wallet connection
- Solana wallet support
- Live wallet balance fetching

### Policy Engine

Convert natural language policies into structured portfolio rules.

Example:

Keep 40% USDC and 60% SOL

↓

{
  "sol": 60,
  "usdc": 40
}

### Compliance Engine

Determine whether a portfolio follows the user's policy.

### Risk Engine

Calculate portfolio risk levels.

### Agent Recommendation

Generate suggested portfolio actions.

### Agent Reasoning

Explain why actions are recommended.

### Trade Preview Engine

Preview:

- Sell amount
- Receive amount
- Route
- Price impact

---

## Technology Stack

Frontend

- Next.js
- TypeScript
- Tailwind CSS

Blockchain

- Solana
- Phantom Wallet
- Wallet Adapter

Tooling

- Rust
- Cargo
- Anchor
- GitHub

---

## Vision

PolicyPilot enables autonomous portfolio management through natural language policies.

Instead of manually managing allocations, users define objectives and PolicyPilot continuously evaluates and recommends actions.

---

## Current Status

Milestones completed:

- Milestone 1 - Wallet Connection
- Milestone 2 - Recommendation Engine
- Milestone 3 - Wallet Balance Integration
- Milestone 4 - Compliance & Risk Engine
- Milestone 5 - Agent Reasoning
- Milestone 6 - Trade Preview Engine