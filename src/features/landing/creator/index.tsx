"use client";

import { useEffect, useState } from "react";
import { Pencil, Share2, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Form, Input, Upload, message } from "antd";
import {
  HomeOutlined,
  DollarCircleOutlined,
  UserOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import DashboardLayout from "@/src/components/layout/dashboard-layout";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/src/constant/constant";

const { TextArea } = Input;

export interface Profile {
  name: string;
  bio: string;
  githubHandle: string;
  twitterHandle: string;
  photoHash: string;
}

export default function ProfilePage() {
  const { address } = useAccount();
  const { data: profileData, isLoading: isProfileLoading } = useReadContract({
    abi: CONTRACT_ABI,
    address: CONTRACT_ADDRESS,
    functionName: "getCreatorProfile",
    args: [address],
  }) as { data: Profile | undefined; isLoading: boolean };

  const [messageApi, contextHolder] = message.useMessage();
  const { writeContract, data: hash, isPending, isError } = useWriteContract();
  const { isSuccess: isSuccessHash } = useWaitForTransactionReceipt({
    hash,
  });

  const [formData, setFormData] = useState<Profile>({
    name: "",
    bio: "",
    githubHandle: "",
    twitterHandle: "",
    photoHash: "",
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm<Profile>();

  useEffect(() => {
    if (isSuccessHash) {
      messageApi.success("Profile updated successfully!");
      setIsEditing(false);
    }
  }, [isSuccessHash, messageApi]);

  useEffect(() => {
    if (isError) {
      messageApi.error("An error occurred while saving your profile.");
    }
  }, [isError, messageApi]);

  useEffect(() => {
    if (profileData) {
      setFormData(profileData);
    }
  }, [profileData]);

  const navigationLinks = [
    {
      href: "/dashboard/creator",
      label: "Dashboard",
      icon: <HomeOutlined className="w-5 h-5 text-white" />,
    },
    {
      href: "/dashboard/creator/profile",
      label: "Profile",
      icon: <UserOutlined className="w-5 h-5 text-white" />,
    },
    {
      href: "#",
      label: "Earnings",
      icon: <DollarCircleOutlined className="w-5 h-5 text-white" />,
    },
  ];

  const handleSubmission = async (fileToUpload: File) => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", fileToUpload);

      const metadata = JSON.stringify({ name: fileToUpload.name });
      formData.append("pinataMetadata", metadata);

      const options = JSON.stringify({ cidVersion: 0 });
      formData.append("pinataOptions", options);

      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
          },
          body: formData,
        }
      );

      const resData = await res.json();
      const ipfsHash = resData.IpfsHash;

      setFormData((prev) => ({
        ...prev,
        photoHash: ipfsHash,
      }));

      messageApi.success("File uploaded successfully!");
    } catch (error) {
      messageApi.error("File upload failed.");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleChange = (changedValues: Partial<Profile>) => {
    setFormData((prev) => ({ ...prev, ...changedValues }));
  };

  const onFinish = async () => {
    try {
      await writeContract({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: "editProfile",
        args: [
          formData.name,
          formData.bio,
          formData.photoHash,
          formData.twitterHandle,
          formData.githubHandle,
        ],
      });
    } catch (error) {
      messageApi.error("An error occurred while saving your profile.");
      console.error(error);
    }
  };

  return (
    <DashboardLayout links={navigationLinks}>
      {contextHolder}
      <div className="relative h-48 w-full">
        <Image
          src="/assets/images/banner.png"
          alt="Profile Banner"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="px-6 py-8 text-white">
        {/* Header */}
        <div className="flex items-center gap-4 mb-16">
          {isEditing && (
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
          )}
          <Image
            src={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${profileData?.photoHash}`}
            alt="Profile picture"
            width={56}
            height={56}
            className="rounded-full"
          />
          <div>
            <h1 className="text-2xl text-white font-semibold">
              {profileData?.name}
            </h1>
            <p className="text-gray-400">Set up your Alpha Experience</p>
          </div>
        </div>

        {/* Main Profile Section */}
        <div className="space-y-12 w-full">
          <div className="flex justify-center">
            <Image
              src={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${profileData?.photoHash}`}
              alt="Large profile picture"
              width={160}
              height={100}
              className="rounded-full h-[11rem]"
            />
          </div>

          {!isEditing ? (
            <>
              {/* Action Buttons */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                >
                  <Pencil size={20} />
                  Edit profile
                </button>

                <button
                  onClick={() => {
                    const profileUrl = window.location.href; // Get the current profile URL

                    if (navigator.share) {
                      // Use Web Share API if available (for mobile & some browsers)
                      navigator.share({
                        title: "Check out this profile!",
                        url: profileUrl,
                      });
                    } else {
                      // Copy to clipboard for manual sharing
                      navigator.clipboard
                        .writeText(profileUrl)
                        .then(() => alert("Profile link copied to clipboard!"))
                        .catch(() => alert("Failed to copy profile link."));
                    }
                  }}
                  className="flex items-center gap-2 px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                >
                  <Share2 size={20} />
                  Share profile
                </button>
              </div>

              {/* Profile Information */}
              <div className="space-y-8 mx-auto w-[50%]">
                <div>
                  <h2 className="text-gray-400 mb-2">Name</h2>
                  <p className="text-lg">{profileData?.name}</p>
                </div>
                <div>
                  <h2 className="text-gray-400 mb-2">Bio</h2>
                  <p className="text-lg whitespace-pre-line">
                    {profileData?.bio}
                  </p>
                </div>
                <div>
                  <h2 className="text-gray-400 mb-2">Github</h2>
                  <p className="text-lg">{profileData?.githubHandle || "-"}</p>
                </div>
                <div>
                  <h2 className="text-gray-400 mb-2">Twitter</h2>
                  <p className="text-lg">{profileData?.twitterHandle || "-"}</p>
                </div>
              </div>
            </>
          ) : (
            <div className="w-[50%] mx-auto">
              <Form
                form={form}
                initialValues={formData}
                onFinish={onFinish}
                onValuesChange={handleChange}
                layout="vertical"
                className="space-y-6"
              >
                <Form.Item
                  label={
                    <span className="text-white text-base font-normal">
                      Profile Picture
                    </span>
                  }
                  extra={
                    <span className="text-gray-400">
                      Click or drag an image to upload your profile picture
                    </span>
                  }
                >
                  <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={(file) => {
                      handleSubmission(file);
                      return false;
                    }}
                  >
                    {formData.photoHash ? (
                      <div className="relative group">
                        <img
                          src={`https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/ipfs/${formData.photoHash}`}
                          alt="avatar"
                          style={{ width: "100%" }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white">Change Picture</span>
                        </div>
                      </div>
                    ) : (
                      <div>
                        {isUploading ? <LoadingOutlined /> : <PlusOutlined />}
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    )}
                  </Upload>
                </Form.Item>
                <Form.Item
                  label={
                    <span className="text-white text-base font-normal">
                      Name
                    </span>
                  }
                  name="name"
                >
                  <Input className="bg-[#111] border-none text-white px-4 py-3 rounded-lg text-base" />
                </Form.Item>
                <Form.Item
                  label={
                    <span className="text-white text-base font-normal">
                      Bio
                    </span>
                  }
                  name="bio"
                >
                  <TextArea
                    className="bg-[#111] border-none text-white px-4 py-3 rounded-lg text-base min-h-[160px]"
                    rows={6}
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <span className="text-white text-base font-normal">
                      Github
                    </span>
                  }
                  name="githubHandle"
                >
                  <Input className="bg-[#111] border-none text-white px-4 py-3 rounded-lg text-base" />
                </Form.Item>
                <Form.Item
                  label={
                    <span className="text-white text-base font-normal">
                      Twitter
                    </span>
                  }
                  name="twitterHandle"
                >
                  <Input className="bg-[#111] border-none text-white px-4 py-3 rounded-lg text-base" />
                </Form.Item>
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-3 rounded-full bg-[#C1F0C1] hover:bg-[#A1E0A1] text-black font-medium transition-colors disabled:opacity-50"
                >
                  {isPending ? "Saving..." : "Save Profile"}
                </button>
              </Form>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
