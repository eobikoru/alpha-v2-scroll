"use client"
import { useState } from "react"
import { Tabs, Button } from "antd"
import { GlobalOutlined, TwitterOutlined } from "@ant-design/icons"
import Image from "next/image"
import DashboardLayout from "@/src/components/layout/dashboard-layout"
import { HomeOutlined, DollarCircleOutlined, UserOutlined } from "@ant-design/icons";
import { BuyModal } from "@/src/components/modals/buy-modal"
import { BookSessionModal } from "@/src/components/modals/book-section-modal"

// interface CreatorProfileProps {
//   params: {
//     id: string
//   }
// }

export default function CreatorProfile( ) {
    const [buyModalOpen, setBuyModalOpen] = useState(false)
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
    const creator = {
      name: "Kamakazi Shimeru",
      title: "Trader",
      avatar: "/assets/images/bnb.png",
    }
    const navigationLinks = [
        { href: "/dashboard/buyer", label: "Home", icon: <HomeOutlined className="w-5 h-5 text-white" /> },
        // { href: "/profile", label: "Profile", icon: <UserOutlined className="w-5 h-5 text-white" /> },
        { href: "/dashboard/buyer/home", label: "Dashboard", icon: <DollarCircleOutlined className="w-5 h-5 text-white" /> },
      ];
  return (
    <>
    <DashboardLayout links={navigationLinks}>
      {/* Banner */}
      <div className="min-h-screen bg-black">
      <div className="h-48 w-full overflow-hidden relative">
        <Image
           src="/assets/images/banner.png"
          alt="Banner"
          fill
          className="object-cover"
        />
      </div>

      {/* Profile Section */}
      <div className="max-w-7xl mx-auto mt-16 px-4 sm:px-6 lg:px-8 pb-6">
        <div className="flex justify-between items-start mt-[-48px]">
          <div className="flex items-end gap-4">
            <Image
              src="/assets/images/bnb.png"
              alt="Kamakazi"
              width={96}
              height={96}
              className="rounded-full border-4 border-black"
            />
            <h2 className="text-2xl font-bold text-white mb-2">Kamakazi</h2>
          </div>
          <button
  onClick={() => setIsBookingModalOpen(true)}
  className="bg-lime-300 hover:bg-lime-400 text-black font-medium h-10 flex items-center px-4 rounded"
>
  Book a session
</button>

        </div>

        {/* Tabs */}
        <Tabs
          defaultActiveKey="overview"
          className="creator-tabs mt-6"
          items={[
            {
              key: "overview",
              label: "Overview",
              children: (
                <div className="text-zinc-300 my-8">
                  <p className="mb-4">⭐ Football Legend! 🏆 5x Ballon d'Or Winner | 🎯 Record-Breaker</p>
                  <p>
                    Global icon with an unstoppable passion for football and excellence. Proud father, entrepreneur, and
                    philanthropist. Sharing moments from my journey on and off the pitch. 💪✨
                  </p>
                  <div className="flex gap-3 mt-4">
                    <Button
                      icon={<TwitterOutlined />}
                      className="bg-zinc-800 border-none text-zinc-300 hover:text-white hover:bg-zinc-700"
                    />
                    <Button
                      icon={<GlobalOutlined />}
                      className="bg-zinc-800 border-none text-zinc-300 hover:text-white hover:bg-zinc-700"
                    />
                  </div>
                </div>
              ),
            },
            {
              key: "reviews",
              label: "Reviews",
              children: <div className="text-zinc-400 text-center mt-10">No reviews yet</div>,
            },
          ]}
        />

        {/* Tools Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-white mb-6">Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800 hover:border-lime-300/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center overflow-hidden">
                    <Image
                      src="/placeholder.svg"
                      alt="Tool Avatar"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white">Top Degen Resource</h4>
                      <span className="text-xs bg-amber-900/50 text-amber-500 px-2 py-1 rounded">Best Seller</span>
                    </div>
                    <p className="text-sm text-zinc-400 mb-3">
                      The ultimate hub for degens in the Web3 space. Stay ahead of the curve with real-time alpha,
                      expert insights, and curated guides on trading, NFTs, DeFi, and crypto trends.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-zinc-500">
                        <span>1 PDF</span>
                        <span>3 Videos</span>
                      </div>
                      <span className="text-lime-400">300KYA</span>
                    </div>
                    <button
  onClick={() => setBuyModalOpen(true)}
  className="w-full mt-4 bg-lime-300 hover:bg-lime-400 text-black font-medium py-2 rounded"
>
  Buy
</button>
    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
      <BuyModal isOpen={buyModalOpen} onClose={() => setBuyModalOpen(false)} amount="300" />
      <BookSessionModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} creator={creator} />
      
      </DashboardLayout>
      <style jsx global>{`
        .creator-tabs .ant-tabs-nav::before {
          border-bottom: 1px solid rgb(63 63 70);
        }
        .creator-tabs .ant-tabs-tab {
          color: rgb(161 161 170);
          padding: 12px 0;
          margin: 0 16px 0 0;
        }
        .creator-tabs .ant-tabs-tab:hover {
          color: white;
        }
        .creator-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
          color: rgb(163 230 53);
        }
        .creator-tabs .ant-tabs-ink-bar {
          background: rgb(163 230 53);
        }
      `}</style>
    </>
  )
}

