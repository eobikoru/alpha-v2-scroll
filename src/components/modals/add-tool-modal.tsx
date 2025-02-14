"use client"

import "antd/dist/reset.css"; 
import { Modal, Input, Upload, Button } from "antd"
import { ArrowLeft, UploadIcon } from "lucide-react"
import { useEffect, useState } from "react"
import type { RcFile } from "antd/es/upload/interface"
import { SuccessModal } from "./success-modal"
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/src/constant/constant"
import type React from "react"

const { TextArea } = Input




interface AddToolModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddToolModal({ isOpen, onClose }: AddToolModalProps) {
  const { writeContract, data: hash, isPending, isError } = useWriteContract()
  const { isSuccess: isSuccessHash } = useWaitForTransactionReceipt({
    hash,
  })

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [fileError, setFileError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      await writeContract({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: "addTool",
        args: [form.name, form.description, form.category, form.price],
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (isSuccessHash) {
      setShowSuccess(true)
      onClose()
    }
  }, [isSuccessHash])

  const handleSuccessClose = () => {
    setShowSuccess(false)
    onClose()
  }

  const beforeUpload = (file: RcFile) => {
    const isValidFormat = file.type === "application/pdf" || file.type === "image/png"
    const isValidSize = file.size / 1024 / 1024 < 50 // 50MB

    if (!isValidFormat) {
      setFileError("Only PDF and PNG files are allowed!")
      return Upload.LIST_IGNORE
    }

    if (!isValidSize) {
      setFileError("File must be smaller than 50MB!")
      return Upload.LIST_IGNORE
    }

    setFileError("")
    return true
  }

  const handleUpload = async (options: any) => {
    const { file, onSuccess, onError } = options

    try {
      const data = new FormData()
      data.append("file", file)
      data.append("pinataMetadata", JSON.stringify({ name: "File name" }))
      data.append("pinataOptions", JSON.stringify({ cidVersion: 0 }))

      const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
        },
        body: data,
      })

      const resData = await res.json()
      const ipfsHash = resData.IpfsHash

      setForm((prev) => ({ ...prev, category: ipfsHash }))
      onSuccess("Ok")
    } catch (err) {
      console.log("Trouble uploading file")
      onError({ err })
    }
  }

  return (
    <>
      <Modal
        open={isOpen}
        onCancel={onClose}
        footer={null}
        width={600}
        className="[&_.ant-modal-content]:bg-zinc-900 [&_.ant-modal-content]:p-0"
        closable={!isPending}
      >
        {isPending && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-lime-400"></div>
          </div>
        )}
        <div className="p-6">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-sm bg-zinc-800 px-4 py-2 rounded-full mb-6 text-white hover:bg-zinc-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <h2 className="text-xl font-semibold text-white mb-2">Tools Set Up</h2>
          <p className="text-zinc-400 mb-8">
            Add tools that showcase your skills and value to your audience. You can upload templates, guides, videos,
            and more.
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white mb-2">Tool name(s)</label>
              <Input
                placeholder="Enter the name of your tool(vs)"
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                className="bg-black border-zinc-800 text-white placeholder:text-zinc-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Tool Description</label>
              <TextArea
                placeholder="Provide a brief description of your tool(s), max 250 characters"
                value={form.description}
                onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                maxLength={1000}
                rows={4}
                className="bg-black border-zinc-800 text-white placeholder:text-zinc-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Upload guide for the tools</label>
              <Upload.Dragger
                beforeUpload={beforeUpload}
                customRequest={handleUpload}
                className="border-zinc-800 hover:bg-zinc-900 px-8 py-12"
              >
                <div className="text-center">
                  <UploadIcon className="w-8 h-8 text-lime-400 mx-auto mb-2" />
                  <p className="text-zinc-400 text-sm">
                    Supported formats: PDF, PNG
                    <br />
                    Max size: 50MB
                  </p>
                </div>
              </Upload.Dragger>
              {fileError && <p className="text-red-500 mt-2">{fileError}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-white mb-2">Price (in Kaia)</label>
              <Input
                placeholder="Enter price (e.g., 0.01 KAIA)"
                value={form.price}
                onChange={(e) => {
                  const value = e.target.value
                  if (value === "" || /^\d*\.?\d*$/.test(value)) {
                    setForm((prev) => ({ ...prev, price: value }))
                  }
                }}
                className="bg-black border-zinc-800 text-white placeholder:text-zinc-600"
              />
            </div>

            <Button
              type="primary"
              onClick={handleSubmit}
              disabled={isPending}
              className="w-full bg-lime-400 border-lime-400 text-black hover:bg-lime-500 hover:border-lime-500 h-12 text-base font-medium"
            >
              {isPending ? "Saving..." : "Save And Continue"}
            </Button>
          </div>
        </div>
      </Modal>
      <SuccessModal isOpen={showSuccess} onClose={handleSuccessClose} />
    </>
  )
}

