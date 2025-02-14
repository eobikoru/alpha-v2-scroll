"use client";

import { useState } from "react";
import { Modal } from "antd";
import { ArrowLeft, Search, FileText, Video } from "lucide-react";
import Image from "next/image";

interface Tool {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
}

interface AllToolsModalProps {
  isOpen: boolean;
  onClose: () => void;
  tools: Tool[];
}

export function AllToolsModal({ isOpen, onClose, tools }: AllToolsModalProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTools = tools?.filter((tool: any) =>
    tool?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={800}
      className="[&_.ant-modal-content]:bg-zinc-900 [&_.ant-modal-content]:p-0"
      closable={false}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-xl font-semibold text-white">All Tools</h2>
        </div>

        {/* Search */}
        <div className="relative flex-1 mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-800 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
        </div>

        {/* Tools List */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {filteredTools?.map((tool: any) => (
            <div
              key={tool.id}
              className="bg-zinc-800/50 rounded-lg p-4 hover:bg-zinc-800 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-zinc-400 mb-4">
                    {tool.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-zinc-400" />
                        <a
                          href={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${tool?.category}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-lime-400 underline"
                        >
                          {tool.name} PDF
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Video
                          href={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${tool?.category}`}
                          className="w-4 h-4 text-zinc-400"
                        />
                        <span className="text-xs text-zinc-400">
                          {/* {tool.stats.videos} Videos */}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {/* <img
                          src={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${tool?.category}`}
                          alt={tool?.name}
                        /> */}

                        <span className="text-xs text-lime-400">
                          {/* {tool.stats.purchases} Purchases */}
                        </span>
                      </div>
                    </div>
                    <span className="text-lime-400 font-medium">
                      {`${tool.price} KAIA`}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
