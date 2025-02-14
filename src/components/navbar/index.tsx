"use client";
import Link from "next/link";
import Image from "next/image";
import { Wallet } from "../wallet/Wallet";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function Navbar() {
  const { isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      router.push("/onboarding");
    } else {
      router.push("/");
    }
  }, [isConnected, router]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b  border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/images/alp.png"
              alt="Alpha Logo"
              width={100}
              height={40}
              className="w-24"
            />
          </Link>
          <Wallet>Connect Wallet</Wallet>
        </div>
      </div>
    </nav>
  );
}
