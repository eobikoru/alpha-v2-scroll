import { useState, useEffect } from "react"
import { Modal, Button, message } from "antd"
import { ArrowLeftOutlined, CheckCircleFilled } from "@ant-design/icons"
import { useRouter } from "next/navigation"
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/src/constant/constant";

interface BuyModalProps {
  isOpen: boolean
  onClose: () => void
  amount: string
  creatorTools: any
}

export function BuyModal({ isOpen, onClose, amount, creatorTools }: BuyModalProps) {
  const router = useRouter()
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false)
  const [messageApi, contextHolder] = message.useMessage();

  const { writeContract, data: hash, isPending, isError, error } = useWriteContract();
  const { isSuccess: isSuccessHash } = useWaitForTransactionReceipt({
    hash,
  });
  const { address } = useAccount();


  const showSuccess = (content: string) =>
    messageApi.open({ type: "success", content });

  const showError = (content: string) =>
    messageApi.open({ type: "error", content });

  useEffect(() => {
    if (isSuccessHash) {
      showSuccess("Payment successful!");
      setIsPaymentSuccess(true);
    }
    if (isError) {
      showError(`Transaction failed`);
    }
  }, [isSuccessHash, isError, error, messageApi]);

  const handlePayment = async () => {
    if (!address) {
      showError("Please connect your wallet first");
      return;
    }

    try {
      console.log(creatorTools?.creator, Number(creatorTools?.id), "test.....")
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "purchaseTool",
        args: [creatorTools?.creator, Number(creatorTools?.id)],
      });
    } catch (error) {
      console.error("Error calling purchaseTool:", error);
      showError("Failed to initiate the transaction");
    }
  }

  const handleGotoDashboard = () => {
    router.push("/dashboard")
    onClose()
    setIsPaymentSuccess(false)
  }

  return (
    <Modal open={isOpen} onCancel={onClose} footer={null} width={480} className="payment-modal" closeIcon={null}>
      {contextHolder}
      <div className="p-6">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8"
        >
          <ArrowLeftOutlined /> Back
        </button>

        {!isPaymentSuccess ? (
          <div className="text-center">
            <h3 className="text-zinc-400 mb-2">Total amount</h3>
            <p className="text-3xl font-semibold text-white mb-6">{amount} USDT</p>

            <Button
              className="w-full h-12 bg-[#D1FF7C] hover:bg-[#c1ef6c] text-black font-medium text-base"
              onClick={handlePayment}
              loading={isPending}
              disabled={isPending}
            >
              {isPending ? "Processing..." : "Make Payment"}
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <CheckCircleFilled className="text-[#D1FF7C] text-5xl mb-4" />
            <h3 className="text-2xl font-semibold text-white mb-2">Payment Successful</h3>
            <p className="text-zinc-400 mb-6">
              Your payment has been processed successfully, and
              <br />
              the tool has been added to your dashboard
            </p>

            <Button
              className="w-full h-12 bg-[#D1FF7C] hover:bg-[#c1ef6c] text-black font-medium text-base"
              onClick={handleGotoDashboard}
            >
              Go to Dashboard
            </Button>
          </div>
        )}
      </div>
    </Modal>
  )
}