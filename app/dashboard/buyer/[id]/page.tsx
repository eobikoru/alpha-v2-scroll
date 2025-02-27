"use client"
import { useState } from "react"
import { Tabs, Button } from "antd"
import { GlobalOutlined, TwitterOutlined } from "@ant-design/icons"
import Image from "next/image"
import DashboardLayout from "@/src/components/layout/dashboard-layout"
import { HomeOutlined, DollarCircleOutlined } from "@ant-design/icons"
import { BuyModal } from "@/src/components/modals/buy-modal"
import { BookSessionModal } from "@/src/components/modals/book-section-modal"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/src/constant/constant"
import { useReadContract, useContractRead } from "wagmi"
import { useParams } from "next/navigation"

interface CreatorProfileProps {
  params: {
    id: string
  }
}

export default function CreatorProfile() {
  const param = useParams()
  const id = param.id
  const [buyModalOpen, setBuyModalOpen] = useState(false)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [selectedTool, setSelectedTool] = useState<any>(null)

  const { data: creatorData, isLoading } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getCreatorProfile",
    args: [id],
  }) as { data: any; isLoading: boolean }

  const { data: creatorTools, isLoading: creatorToolsLoading } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getToolsByCreator",
    args: [id],
  }) as { data: any[] | undefined; isLoading: boolean }

  const creator = creatorData
    ? {
        name: creatorData.name,
        title: creatorData.title || "Creator",
        avatar: creatorData.photoHash
          ? `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${creatorData.photoHash}`
          : "/assets/images/bnb.png",
        bio: creatorData.bio,
        twitterHandle: creatorData.twitterHandle,
        githubHandle: creatorData.githubHandle,
      }
    : {
        name: "Loading...",
        title: "Creator",
        avatar: "/assets/images/bnb.png",
        bio: "Loading...",
        twitterHandle: "",
        githubHandle: "",
      }

  const navigationLinks = [
    { href: "/dashboard/buyer", label: "Home", icon: <HomeOutlined className="w-5 h-5 text-white" /> },
    {
      href: "/dashboard/buyer/home",
      label: "Dashboard",
      icon: <DollarCircleOutlined className="w-5 h-5 text-white" />,
    },
  ]

  const handleBuyClick = (tool: any) => {
    setSelectedTool(tool)
    setBuyModalOpen(true)
  }

  if (isLoading) {
    return (
      <DashboardLayout links={navigationLinks}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-lime-400"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <>
      <DashboardLayout links={navigationLinks}>
        <div className="min-h-screen bg-black">
          {/* Banner */}
          <div className="h-48 w-full overflow-hidden relative">
            <Image src="/assets/images/banner.png" alt="Banner" fill className="object-cover" />
          </div>

          {/* Profile Section */}
          <div className="max-w-7xl mx-auto mt-16 px-4 sm:px-6 lg:px-8 pb-6">
            <div className="flex justify-between items-start mt-[-48px]">
              <div className="flex items-end gap-4">
                <div className="w-24 h-24 relative">
                  <Image
                    src={creator.avatar || "/placeholder.svg"}
                    alt={creator.name}
                    fill
                    className="rounded-full border-4 border-black object-cover"
                  />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{creator.name}</h2>
              </div>
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="bg-lime-300 hover:bg-lime-400 text-black font-medium h-10 flex items-center px-4 rounded"
              >
                Book a session
              </button>
            </div>

            <Tabs
              defaultActiveKey="overview"
              className="creator-tabs mt-6"
              items={[
                {
                  key: "overview",
                  label: <span className="text-white">Overview</span>,
                  children: (
                    <div className="text-zinc-300 my-8">
                      <p className="mb-4">{creator.bio}</p>
                      <div className="flex gap-3 mt-4">
                        {creator.twitterHandle && (
                          <Button
                            icon={<TwitterOutlined />}
                            className="bg-zinc-800 border-none text-zinc-300 hover:text-white hover:bg-zinc-700"
                            onClick={() => window.open(`https://twitter.com/${creator.twitterHandle}`, "_blank")}
                          />
                        )}
                        {creator.githubHandle && (
                          <Button
                            icon={<GlobalOutlined />}
                            className="bg-zinc-800 border-none text-zinc-300 hover:text-white hover:bg-zinc-700"
                            onClick={() => window.open(`https://github.com/${creator.githubHandle}`, "_blank")}
                          />
                        )}
                      </div>
                    </div>
                  ),
                },
                {
                  key: "reviews",
                  label: <span className="text-white">Reviews</span>,
                  children: (
                    <div className="bg-zinc-900/50 my-10 rounded-lg p-8 border border-zinc-800 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-zinc-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-zinc-300">No Reviews yet</h3>
                    </div>
                  ),
                },
              ]}
            />

            {/* Tools Section */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-white mb-6">Tools</h3>
              {Array.isArray(creatorTools) && creatorTools.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {creatorTools.map((tool, index) => (
                    <div
                      key={index}
                      className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800 hover:border-lime-300/50 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-white">{tool.name}</h4>
                            {index === 0 && (
                              <span className="text-xs bg-amber-900/50 text-amber-500 px-2 py-1 rounded">
                                Best Seller
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-zinc-400 mb-3">{tool.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-lime-400">{tool.price.toString()} USDT</span>
                          </div>
                          <button
                            onClick={() => handleBuyClick(tool)}
                            className="w-full mt-4 bg-lime-300 hover:bg-lime-400 text-black font-medium py-2 rounded"
                          >
                            Buy
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-zinc-900/50 rounded-lg p-8 border border-zinc-800 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-zinc-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-zinc-300">No tools</h3>
                  <p className="mt-1 text-sm text-zinc-500">This creator hasn't added any tools yet.</p>
                </div>

                // stop
              )}
            </div>
          </div>
        </div>
        <BuyModal
          isOpen={buyModalOpen}
          onClose={() => setBuyModalOpen(false)}
          amount={selectedTool?.price ?? "0"}
          creatorTools={selectedTool}
        />
        <BookSessionModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} creator={creator} />
      </DashboardLayout>
    </>
  )
}

