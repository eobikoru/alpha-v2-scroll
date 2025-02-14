"use client"

import { UserOutlined, BellOutlined, CustomerServiceOutlined, LogoutOutlined, MenuOutlined } from "@ant-design/icons"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDisconnect } from "wagmi"
import type React from "react"
import { useAccount, useReadContract } from "wagmi"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/src/constant/constant"
import { message } from "antd"

interface LinkItem {
  href: string
  label: string
  icon: React.ReactNode
}

interface DashboardLayoutProps {
  children: React.ReactNode
  links: LinkItem[]
}

export interface Profile {
  name: string
  bio: string
  githubHandle: string
  twitterHandle: string
  photoHash: string
}

export default function DashboardLayout({ children, links }: DashboardLayoutProps) {
  const pathname = usePathname()
  const { address } = useAccount()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const { data: profileData, isLoading: isProfileLoading } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getCreatorProfile",
    args: [address],
  }) as { data: Profile | undefined; isLoading: boolean }

  const isActive = (path: string) => pathname === path
  const [messageApi, contextHolder] = message.useMessage()

  const { disconnect, isSuccess } = useDisconnect()
  const router = useRouter()

  useEffect(() => {
    if (isSuccess) {
      console.log("it worked", isSuccess)
      router.push("/")
    }
  }, [isSuccess, router])

  const handleSupport = () => {
    messageApi.open({
      type: "success",
      content: "Coming soon .......",
    })
  }

  const handleNotification = () => {
    messageApi.open({
      type: "success",
      content: "Coming soon .......",
    })
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="flex h-screen bg-black">
      {contextHolder}
      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-50 w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-auto`}
      >
        <div className="p-4">
          <Image src="/assets/images/alp.png" alt="Alpha Logo" width={100} height={40} className="w-24" />
        </div>

        <nav className="flex-1 overflow-y-auto">
          <div className="px-4 space-y-2">
            {links?.length > 0 ? (
              links?.map(({ href, icon, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    isActive(href) ? "bg-zinc-800 text-white" : "text-zinc-400 hover:text-white hover:bg-zinc-800"
                  }`}
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <span className="flex items-center gap-3">
                    {icon}
                    <span className="text-base">{label}</span>
                  </span>
                </Link>
              ))
            ) : (
              <p className="text-zinc-500 text-center">No links available</p>
            )}
          </div>
        </nav>

        <div className="mt-auto pt-4 px-4 space-y-2">
          <div className="mt-auto pt-8 border-t border-zinc-800 space-y-2">
            <Link
              href="#"
              className="flex items-center gap-3 px-4 py-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
              onClick={() => {
                handleNotification()
                setIsSidebarOpen(false)
              }}
            >
              <BellOutlined className="w-5 h-5" />
              <span className="text-base">Notifications</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 px-4 py-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800"
              onClick={() => {
                handleSupport()
                setIsSidebarOpen(false)
              }}
            >
              <CustomerServiceOutlined className="w-5 h-5" />
              <span className="text-base">Support</span>
            </Link>
            <button
              onClick={() => {
                disconnect()
                setIsSidebarOpen(false)
              }}
              className="flex items-center gap-3 px-4 py-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 w-full"
            >
              <LogoutOutlined className="w-5 h-5" />
              <span className="text-base">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="h-16 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between px-6">
          <button className="md:hidden text-white" onClick={toggleSidebar}>
            <MenuOutlined className="text-2xl" />
          </button>
          <div className="flex-1 max-w-xl">{/* Search input removed as per your comment */}</div>
          <div className="flex items-center gap-4">
            <div className="bg-zinc-800 px-4 py-1.5 rounded-lg text-xs font-mono text-zinc-400">
              {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Not connected"}
            </div>
            {profileData?.photoHash ? (
              <Image
                src={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${profileData?.photoHash}`}
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center">
                <UserOutlined className="text-zinc-400" />
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {isProfileLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-lime-300"></div>
            </div>
          ) : (
            children
          )}
        </main>
      </div>
    </div>
  )
}

