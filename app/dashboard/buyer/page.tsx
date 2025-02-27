"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/src/components/layout/dashboard-layout"
import { ArrowRightOutlined } from "@ant-design/icons"
import Image from "next/image"
import { HomeOutlined, DollarCircleOutlined } from "@ant-design/icons"
import Link from 'next/link'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/src/constant/constant"
import { useContractRead, useContractReads } from "wagmi"
import { Abi } from 'viem'

interface Creator {
  walletAddress: string
  name: string
  profilePicture: string
  bio: string
  githubHandle: string
  twitterHandle: string
}

interface CreatorCardProps {
  creator: Creator
}
interface CreatorProfile {
  creatorAddress: string;
  name: string;
  photoHash: string;
  bio: string;
  githubHandle: string;
  twitterHandle: string;
}

interface CreatorDataResponse {
  status: "success" | "error";
  result?: CreatorProfile;
}


function CreatorCard({ creator }: CreatorCardProps) {
  return (
    <Link href={`/dashboard/buyer/${creator.walletAddress}`} passHref>
      <div className="bg-zinc-900 rounded-xl p-4 hover:ring-2 hover:ring-lime-300 transition-all cursor-pointer h-[380px] flex flex-col">
        <div className="relative w-full h-48 mb-4">
          <Image 
            src={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${creator.profilePicture}`}
            alt={creator.name} 
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <h3 className="font-medium text-white mb-1 truncate">{creator.name}</h3>
        <p className="text-sm text-zinc-400 mb-3 overflow-hidden line-clamp-3">{creator.bio}</p>
        <div className="mt-auto flex flex-col gap-1 text-sm text-zinc-500">
          <span className="truncate">GitHub: {creator.githubHandle}</span>
          <span className="truncate">Twitter: {creator.twitterHandle}</span>
        </div>
      </div>
    </Link>
  )
}

function CreatorSection({ title, creators }: { title: string; creators: Creator[] }) {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          {title}
          <ArrowRightOutlined className="text-lime-300" />
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {creators.map((creator) => (
          <CreatorCard key={creator.walletAddress} creator={creator} />
        ))}
      </div>
    </section>
  )
}

export default function Dashboard() {
  const [creators, setCreators] = useState<Creator[]>([])

  const { data: creatorAddresses, isLoading: addressesLoading } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI as Abi,
    functionName: "getAllRegisteredCreators",
  })

  const { data: creatorsData, isLoading: creatorsLoading } = useContractReads({
    contracts: Array.isArray(creatorAddresses) ? creatorAddresses.map((address: any) => ({
      address: CONTRACT_ADDRESS as any,
      abi: CONTRACT_ABI as any ,
      functionName: "getCreatorProfile",
      args: [address as any],
    })) : [],
  })

  
  useEffect(() => {
    if (creatorsData && !creatorsLoading) {
      const formattedCreators = (creatorsData as CreatorDataResponse[])
        .filter((data) => data.status === "success" && data.result)
        .map(({ result }) => ({
          walletAddress: result?.creatorAddress ?? "",
          name: result?.name ?? "Unknown",
          profilePicture: result?.photoHash ?? "",
          bio: result?.bio ?? "",
          githubHandle: result?.githubHandle ?? "",
          twitterHandle: result?.twitterHandle ?? "",
        }));

      setCreators(formattedCreators);
    }
  }, [creatorsData, creatorsLoading]);

  const navigationLinks = [
    { href: "/dashboard/buyer", label: "Home", icon: <HomeOutlined className="w-5 h-5 text-white" /> },
    { href: "/dashboard/buyer/home", label: "Dashboard", icon: <DollarCircleOutlined className="w-5 h-5 text-white" /> },
  ]
  
  return (
    <DashboardLayout links={navigationLinks}>
      {addressesLoading || creatorsLoading ? (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-lime-400"></div>
        </div>
      ) : (
        <>
          <CreatorSection title="Trending Creators" creators={creators} />
          {/* <CreatorSection title="Creators In Tech" creators={creators.slice(5, 10)} />
          <CreatorSection title="Creators In Entertainment" creators={creators.slice(10, 15)} /> */}
        </>
      )}
    </DashboardLayout>
  )
}