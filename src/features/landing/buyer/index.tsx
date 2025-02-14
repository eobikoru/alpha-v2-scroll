"use client";

import { useState } from "react";
import { Button, Input, Card, Upload } from "antd";
import { EditOutlined, UploadOutlined, GlobalOutlined, TwitterOutlined } from "@ant-design/icons";
import Image from "next/image";
import DashboardLayout from "@/src/components/layout/dashboard-layout";
import { HomeOutlined, DollarCircleOutlined, UserOutlined } from "@ant-design/icons";


interface AppointmentProps {
  username: string;
  time: string;
  date: string;
}

function Appointment({ username, time, date }: AppointmentProps) {
  return (
    <Card className="bg-zinc-900 text-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Image src="/placeholder.svg?height=40&width=40" alt={username} width={40} height={40} className="rounded-full" />
          <span>{username}</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-zinc-400">
          <span>{date} {time}</span>
          <Button type="link" className="text-lime-300">Details</Button>
        </div>
      </div>
    </Card>
  );
}

interface ProfileData {
  name: string;
  sessionPrice: string;
  bio: string;
  website: string;
  twitter: string;
  profilePicture: string | null;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "Cristiano Ronaldo",
    sessionPrice: "0.01 KAIA",
    bio: "⚽ Football Legend | 🏆 5x Ballon d'Or Winner",
    website: "",
    twitter: "",
    profilePicture: null,
  });

  const navigationLinks = [
    { href: "/dashboard", label: "Dashboard", icon: <HomeOutlined className="w-5 h-5 text-white" /> },
    { href: "/earnings", label: "Earnings", icon: <DollarCircleOutlined className="w-5 h-5 text-white" /> },
    { href: "/profile", label: "Profile", icon: <UserOutlined className="w-5 h-5 text-white" /> },
  ];
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <DashboardLayout links={navigationLinks}>
        <Card className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-center">Edit Profile</h1>
          <Upload className="flex justify-center mt-4" showUploadList={false}>
            <Button icon={<UploadOutlined />}>Upload New Picture</Button>
          </Upload>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <Input placeholder="Name" value={profileData.name} onChange={(e) => setProfileData({ ...profileData, name: e.target.value })} />
            <Input placeholder="Session Price" value={profileData.sessionPrice} onChange={(e) => setProfileData({ ...profileData, sessionPrice: e.target.value })} />
            <Input.TextArea placeholder="Bio" value={profileData.bio} onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })} />
            <Input prefix={<GlobalOutlined />} placeholder="Website" value={profileData.website} onChange={(e) => setProfileData({ ...profileData, website: e.target.value })} />
            <Input prefix={<TwitterOutlined />} placeholder="Twitter" value={profileData.twitter} onChange={(e) => setProfileData({ ...profileData, twitter: e.target.value })} />
            <Button type="primary" htmlType="submit" className="w-full">Save Profile</Button>
          </form>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout links={navigationLinks}>
      <Card className="text-center">
        <Image src="/placeholder.svg?height=96&width=96" alt="Profile Picture" width={96} height={96} className="rounded-full" />
        <h1 className="text-2xl font-bold">{profileData.name}</h1>
        <Button icon={<EditOutlined />} onClick={() => setIsEditing(true)}>Edit Profile</Button>
      </Card>
      <Card title="Upcoming Appointments">
        <Appointment username="Kristian234" time="08:00" date="Today" />
        <Appointment username="Kristian234" time="08:00" date="24 Jan" />
      </Card>
    </DashboardLayout>
  );
}
