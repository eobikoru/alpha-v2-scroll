"use client";

import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { Modal } from "antd";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  const handleGoToDashboard = () => {
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={480}
      className="[&_.ant-modal-content]:bg-zinc-900 [&_.ant-modal-content]:p-0"
      closable={false}
    >
      <div className="p-8 flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-lime-400/20 rounded-full flex items-center justify-center mb-6">
          <Check className="w-6 h-6 text-lime-400" />
        </div>

        <h2 className="text-2xl font-semibold text-white mb-2">
          Tool Uploaded Successfully!
        </h2>
        <p className="text-zinc-400 mb-8">
          Your tool has been successfully added to your profile.
          <br />
          What would you like to do next?
        </p>

        <button
          onClick={handleGoToDashboard}
          className="w-full bg-lime-400 text-black font-medium py-4 px-6 rounded-full hover:bg-lime-500 transition-colors"
        >
          Go to Dashboard
        </button>
      </div>
    </Modal>
  );
}
