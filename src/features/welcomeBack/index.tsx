import React, { useEffect } from "react";
import { useAccount, useReadContract } from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/src/constant/constant";
import { BulbOutlined, ShoppingOutlined } from "@ant-design/icons";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import Link from "next/link"
const WelcomeBack = () => {
  const { address } = useAccount();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const {
    data,
    isLoading,
    error: isError,
  }: any = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getCreatorProfile",
    args: [address],
  });

  const [messageApi, contextHolder] = message.useMessage();

  // Reusable Notification Functions
  const showSuccess = (content: string) =>
    messageApi.open({ type: "success", content });

  const showError = (content: string) =>
    messageApi.open({ type: "error", content });

  return (
    <div>
      <div className="min-h-screen mt-[4rem] bg-black text-white p-6">
        <div className="mb-12"></div>
        <div className="max-w-2xl mx-auto bg-zinc-900 rounded-3xl p-8">
          <h1 className="text-2xl font-semibold mb-12">{`Welcome back ${data?.name}`}</h1>
          <div className="flex items-center gap-3 mb-2">
            <BulbOutlined className="w-6 h-6 text-yellow-400" />
            <span className="font-medium">I&apos;m Registered Creator</span>
          </div>
          <p className="text-sm text-zinc-400 pl-9">
            Start sharing your expertise, offering tools, and monetizing your
            knowledge.
          </p>

          <Link href="/dashboard/creator" passHref>
          <p className="block w-full bg-lime-300 cursor-pointer text-black font-medium py-4 rounded-full mt-12 hover:bg-lime-400 transition-colors text-center">
            Go to dashboard
          </p>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBack;
