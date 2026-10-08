"use client";

import { useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Home() {
  const { publicKey, connected } = useWallet();

  const [policy, setPolicy] = useState("");
  const [result, setResult] = useState("");

  const parsePolicy = () => {
    const text = policy.toLowerCase();

    const solMatch = text.match(/(\d+)\s*%\s*sol/);
    const usdcMatch = text.match(/(\d+)\s*%\s*usdc/);

    const parsed = {
      sol: solMatch ? Number(solMatch[1]) : 0,
      usdc: usdcMatch ? Number(usdcMatch[1]) : 0,
    };

    setResult(JSON.stringify(parsed, null, 2));
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
              onClick={parsePolicy}
              className="mt-4 rounded-lg bg-purple-600 px-4 py-2"
            >
              Parse Policy
            </button>
          </div>

          <div className="rounded-xl border border-zinc-800 p-6">
            <h2 className="text-xl font-semibold">
              Agent Recommendation
            </h2>

            <pre className="mt-4 text-zinc-300">
              {result || "Recommendations will appear here."}
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}