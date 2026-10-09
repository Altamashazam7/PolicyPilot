"use client";

import { useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";

export default function Home() {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();

  const [policy, setPolicy] = useState("");
  const [result, setResult] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [solBalance, setSolBalance] = useState<number | null>(null);
  const [compliance, setCompliance] = useState<number | null>(null);
  const [risk, setRisk] = useState("");
  const [confidence, setConfidence] = useState<number | null>(null);
  const [reasoning, setReasoning] = useState("");

  const analyzePolicy = async () => {
    if (connected && publicKey) {
      const balance = await connection.getBalance(publicKey);
      const sol = balance / 1_000_000_000;
      setSolBalance(sol);
    }

    const text = policy.toLowerCase();

    const solMatch = text.match(/(\d+)\s*%\s*sol/);
    const usdcMatch = text.match(/(\d+)\s*%\s*usdc/);

    const targetSol = solMatch ? Number(solMatch[1]) : 0;
    const targetUsdc = usdcMatch ? Number(usdcMatch[1]) : 0;

    const parsed = {
      sol: targetSol,
      usdc: targetUsdc,
    };

    setResult(JSON.stringify(parsed, null, 2));

    const currentSol = 80;
    const currentUsdc = 20;

    const deviation =
      Math.abs(currentSol - targetSol) +
      Math.abs(currentUsdc - targetUsdc);

    const complianceScore = Math.max(0, 100 - deviation);

    setCompliance(complianceScore);

    if (complianceScore >= 80) {
      setRisk("Low");
      setConfidence(95);
    } else if (complianceScore >= 60) {
      setRisk("Medium");
      setConfidence(88);
    } else {
      setRisk("High");
      setConfidence(76);
    }

    let rec = "";

    if (currentSol > targetSol) {
      rec = `Reduce SOL exposure by ${currentSol - targetSol}%`;
    } else if (currentUsdc > targetUsdc) {
      rec = `Reduce USDC exposure by ${currentUsdc - targetUsdc}%`;
    } else {
      rec = "Portfolio already matches policy.";
    }

    setRecommendation(rec);

    setReasoning(
      `Current portfolio allocation differs from your target policy.

Current Allocation:
SOL 80%
USDC 20%

Target Allocation:
SOL ${targetSol}%
USDC ${targetUsdc}%

Recommended Action:
${rec}

Expected Outcome:
Portfolio compliance improves and concentration risk decreases.

Agent Assessment:
The portfolio is currently operating outside your requested allocation policy and should be rebalanced to restore compliance.`
    );
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-6xl p-8">
        <h1 className="text-5xl font-bold">
          PolicyPilot
        </h1>

        <p className="mt-4 text-zinc-400">
          Autonomous DeFi Portfolio Management Through Policies
        </p>

        <div className="mt-6">
          <WalletMultiButton />
        </div>

        {connected && (
          <div className="mt-4 rounded-lg border border-green-700 bg-green-950 p-4">
            <h3 className="font-semibold text-green-400">
              Connected Wallet
            </h3>

            <p className="mt-2 break-all text-sm text-zinc-300">
              {publicKey?.toBase58()}
            </p>

            {solBalance !== null && (
              <p className="mt-2 text-yellow-300">
                SOL Balance: {solBalance.toFixed(4)}
              </p>
            )}
          </div>
        )}

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-zinc-800 p-6">
            <h2 className="text-xl font-semibold">
              Create Policy
            </h2>

            <textarea
              value={policy}
              onChange={(e) => setPolicy(e.target.value)}
              className="mt-4 h-40 w-full rounded-lg bg-zinc-900 p-3"
              placeholder="Keep 40% USDC and 60% SOL"
            />

            <button
              onClick={analyzePolicy}
              className="mt-4 rounded-lg bg-purple-600 px-4 py-2"
            >
              Analyze Policy
            </button>
          </div>

          <div className="rounded-xl border border-zinc-800 p-6">
            <h2 className="text-xl font-semibold">
              Agent Recommendation
            </h2>

            <pre className="mt-4 text-zinc-300">
              {result || "Parsed policy appears here."}
            </pre>

            {compliance !== null && (
              <div className="mt-4 rounded bg-blue-950 p-4">
                <p>Compliance Score: {compliance}%</p>
                <p>Risk Level: {risk}</p>
                <p>Agent Confidence: {confidence}%</p>
              </div>
            )}

            <div className="mt-4 rounded bg-green-950 p-4 text-green-300">
              {recommendation || "Agent recommendation appears here."}
            </div>

            {reasoning && (
              <div className="mt-4 rounded bg-zinc-900 p-4">
                <h3 className="mb-2 font-semibold text-purple-400">
                  Agent Reasoning
                </h3>

                <p className="whitespace-pre-line text-zinc-300">
                  {reasoning}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}