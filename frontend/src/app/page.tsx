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

    let rec = "";

    if (currentSol > targetSol) {
      rec = `Swap ${currentSol - targetSol}% SOL into USDC`;
    } else if (currentUsdc > targetUsdc) {
      rec = `Swap ${currentUsdc - targetUsdc}% USDC into SOL`;
    } else {
      rec = "Portfolio already matches policy.";
    }

    setRecommendation(rec);
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
              placeholder="Example: Keep 40% USDC and 60% SOL"
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

            <div className="mt-4 rounded bg-zinc-900 p-4">
              <p className="font-semibold text-blue-400">
                Portfolio Engine
              </p>

              <p>Policy analysis complete</p>
            </div>

            <pre className="mt-4 text-zinc-300">
              {result || "Parsed policy appears here."}
            </pre>

            <div className="mt-4 rounded bg-green-950 p-4 text-green-300">
              {recommendation || "Agent recommendation appears here."}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}