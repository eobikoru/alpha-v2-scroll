import { useState } from "react"
import { Modal, Button } from "antd"
import { ArrowLeftOutlined, CheckCircleFilled } from "@ant-design/icons"
import { useRouter } from "next/navigation"

interface BuyModalProps {
  isOpen: boolean
  onClose: () => void
  amount: string
}

export function BuyModal({ isOpen, onClose, amount }: BuyModalProps) {
  const router = useRouter()
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false)

  const handlePayment = () => {
    setIsPaymentSuccess(true)
  }

  const handleGotoDashboard = () => {
    // router.push("/dashboard")
    onClose()
    setIsPaymentSuccess(false)
  }

  return (
    <Modal open={isOpen} onCancel={onClose} footer={null} width={480} className="payment-modal" closeIcon={null}>
      <div className="p-6">
        <button
          onClick={isPaymentSuccess ? onClose : onClose}
          className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8"
        >
          <ArrowLeftOutlined /> Back
        </button>

        {!isPaymentSuccess ? (
          <div className="text-center">
            <h3 className="text-zinc-400 mb-2">Total amount</h3>
            <p className="text-3xl font-semibold text-white mb-6">{amount}KYA</p>

            <Button
              className="w-full h-12 bg-[#D1FF7C] hover:bg-[#c1ef6c] text-black font-medium text-base"
              onClick={handlePayment}
            >
              Make Payment
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

