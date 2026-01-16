'use client';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { parseEther } from 'viem';
import { useState, useEffect } from 'react';

// Nanti kita ganti ini dengan alamat Smart Contract aslimu
const CONTRACT_ADDRESS = "0x91652c65d58ab0Ac10E2ddab03C3cE481C344452"; 
const CONTRACT_ABI = [
	{
		"inputs": [{"internalType": "string","name": "_orderId","type": "string"}],
		"name": "pay",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
] as const;

export default function Home() {
  const { isConnected } = useAccount();
  const { data: hash, isPending, writeContract } = useWriteContract();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handlePayment = async () => {
    if (CONTRACT_ADDRESS === "0x0000000000000000000000000000000000000000") {
      alert("Smart Contract belum dipasang! Nanti kita pasang setelah ini.");
      return;
    }
    writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'pay',
      args: ["ORDER-1337"], 
      value: parseEther('0.001'), 
    });
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-black selection:bg-green-900 selection:text-white">
      
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px'}}>
      </div>

      {/* Tombol Wallet */}
      <div className="absolute top-6 right-6 z-10">
        <ConnectButton showBalance={false} chainStatus="none" accountStatus="address" />
      </div>

      {/* Kotak Utama */}
      <div className="relative z-10 w-full max-w-md border border-green-800 bg-black/90 p-8 shadow-[0_0_50px_-15px_rgba(34,197,94,0.5)] backdrop-blur-sm">
        
        <div className="mb-10 text-center border-b border-green-900 pb-6">
          <h1 className="text-5xl font-bold tracking-tighter text-white mb-2">1337_PAY</h1>
          <p className="text-xs text-green-600 font-mono tracking-[0.2em]">SECURE PAYMENT GATEWAY</p>
        </div>

        <div className="space-y-4 mb-8 font-mono text-sm">
          <div className="flex justify-between items-center p-2 border-b border-green-900/30">
            <span className="text-green-700">ITEM</span>
            <span className="text-white">ACCESS KEY V1</span>
          </div>
          <div className="flex justify-between items-center p-2 border-b border-green-900/30">
            <span className="text-green-700">PRICE</span>
            <span className="text-white font-bold">0.001 ETH</span>
          </div>
        </div>

        {!isConnected ? (
          <div className="text-center py-6 border border-dashed border-green-900 text-green-800 text-xs">
            [ SYSTEM LOCKED ]
            <br/>PLEASE CONNECT WALLET TO PROCEED
          </div>
        ) : isSuccess ? (
          <div className="bg-green-500/10 border border-green-500 p-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">SUCCESS</h2>
            <p className="text-[10px] text-green-400 break-all mb-4">TX: {hash}</p>
            <button onClick={() => window.location.reload()} className="text-xs underline text-green-500">RESET</button>
          </div>
        ) : (
          <button
            onClick={handlePayment}
            disabled={isPending || isConfirming}
            className="w-full bg-green-600 hover:bg-green-500 text-black font-bold py-4 text-lg tracking-wider transition-all disabled:opacity-50"
          >
            {isPending ? 'SIGNING...' : isConfirming ? 'PROCESSING...' : 'EXECUTE PAYMENT >>'}
          </button>
        )}
      </div>
    </main>
  );
}