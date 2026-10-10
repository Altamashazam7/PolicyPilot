# PolicyPilot Architecture

## Overview

PolicyPilot is an AI-powered DeFi portfolio management agent built on Solana.

Users describe portfolio objectives in natural language.

Example:

"Keep 40% USDC and 60% SOL"

PolicyPilot translates these policies into structured portfolio rules, evaluates compliance, assesses risk, generates recommendations, explains reasoning, and previews trades.

---

## System Architecture

User
↓
Phantom Wallet
↓
PolicyPilot

### Processing Flow

User
↓
Natural Language Policy
↓
Policy Engine
↓
Compliance Engine
↓
Risk Engine
↓
Recommendation Engine
↓
Reasoning Engine
↓
Trade Preview Engine
↓
Future Jupiter Execution

---

## Component Breakdown

### 1. Wallet Layer

Responsibilities:

- Connect Phantom Wallet
- Read wallet address
- Read wallet SOL balance

Current Status:

✅ Implemented

---

### 2. Policy Engine

Responsibilities:

- Parse user policies
- Extract allocation targets
- Generate structured rules

Example:

Input:

Keep 40% USDC and 60% SOL

Output:

{
  "sol": 60,
  "usdc": 40
}

Current Status:

✅ Implemented

---

### 3. Compliance Engine

Responsibilities:

- Compare portfolio allocation against policy
- Detect allocation drift
- Calculate compliance score

Output Example:

Compliance Score: 60%

Current Status:

✅ Implemented

---

### 4. Risk Engine

Responsibilities:

- Assess portfolio concentration
- Classify risk level
- Generate confidence score

Output Example:

Risk Level: Medium

Agent Confidence: 88%

Current Status:

✅ Implemented

---

### 5. Recommendation Engine

Responsibilities:

- Generate portfolio adjustment suggestions
- Produce rebalancing actions

Output Example:

Reduce SOL exposure by 20%

Current Status:

✅ Implemented

---

### 6. Reasoning Engine

Responsibilities:

- Explain recommendations
- Provide decision transparency

Output Example:

Current portfolio allocation exceeds target allocation.

Reducing SOL exposure improves compliance and lowers concentration risk.

Current Status:

✅ Implemented

---

### 7. Trade Preview Engine

Responsibilities:

- Preview trade actions
- Display estimated outcomes
- Present expected routing information

Output Example:

Sell: 0.25 SOL

Receive: 42.50 USDC

Route: Jupiter

Price Impact: 0.08%

Current Status:

✅ Implemented

---

## Future Architecture

### Jupiter Integration

Responsibilities:

- Fetch live quotes
- Estimate outputs
- Estimate price impact
- Route optimisation

Status:

🔄 Planned

---

### Trade Execution Engine

Responsibilities:

- Execute recommended swaps
- One-click rebalancing

Status:

🔄 Planned

---

### Autonomous Rebalancing

Responsibilities:

- Continuous monitoring
- Policy enforcement
- Automatic adjustments

Status:

🔄 Planned

---

### On-Chain Policy Accounts

Responsibilities:

- Store policy definitions on Solana
- Enable portable policy management

Status:

🔄 Planned

---

## Technology Stack

### Frontend

- Next.js
- TypeScript
- Tailwind CSS

### Blockchain

- Solana
- Phantom Wallet
- Wallet Adapter

### Tooling

- Rust
- Cargo
- Anchor

### Development

- Git
- GitHub
- WSL

---

## Current Milestones

✅ Milestone 1 - Wallet Connection

✅ Milestone 2 - Recommendation Engine

✅ Milestone 3 - Wallet Balance Integration

✅ Milestone 4 - Compliance & Risk Engine

✅ Milestone 5 - Agent Reasoning

✅ Milestone 6 - Trade Preview Engine

✅ Milestone 7 - Documentation Package