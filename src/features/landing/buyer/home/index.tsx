"use client"
import { useState } from "react"
import Image from "next/image"
import DashboardLayout from "@/src/components/layout/dashboard-layout"
import { HomeOutlined, DollarCircleOutlined } from "@ant-design/icons"

import { Tabs, Button, Card, Avatar, Modal } from "antd"
import { CalendarOutlined, FileTextOutlined } from "@ant-design/icons"

type Appointment = {
  id: number
  username: string
  date: string
  time: string
  avatar: string
}

const BuyerHome = () => {
  const [isViewAllModalVisible, setIsViewAllModalVisible] = useState(false)
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

  const showViewAllModal = () => {
    setIsViewAllModalVisible(true)
  }

  const showDetailsModal = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setIsDetailsModalVisible(true)
  }

  const handleModalClose = () => {
    setIsViewAllModalVisible(false)
    setIsDetailsModalVisible(false)
    setSelectedAppointment(null)
  }
  const resources = [
    {
      id: 1,
      title: "Top Degen Resource",
      description:
        "The ultimate hub for degens in the Web3 space. Stay ahead of the curve with real-time alpha, expert insights, and curated guides on trading, NFTs, DeFi, and crypto trends.",
      avatar: "/placeholder.svg?height=40&width=40",
      price: "300KYA",
      type: "PDF",
      variant: "blue",
    },
  ].concat(
    Array(5).fill({
      id: 1,
      title: "Top Degen Resource",
      description:
        "The ultimate hub for degens in the Web3 space. Stay ahead of the curve with real-time alpha, expert insights, and curated guides on trading, NFTs, DeFi, and crypto trends.",
      avatar: "/placeholder.svg?height=40&width=40",
      price: "300KYA",
      type: "PDF",
      variant: "purple",
    }),
  )

  const appointments: Appointment[] = [
    {
      id: 1,
      username: "Kristian234",
      date: "Today",
      time: "08:00",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      username: "Kristian234",
      date: "Today",
      time: "08:00",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      username: "Kristian234",
      date: "24 Jan",
      time: "08:00",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 4,
      username: "Kristian234",
      date: "24 Jan",
      time: "08:00",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ]
  const navigationLinks = [
    { href: "/dashboard/buyer", label: "Home", icon: <HomeOutlined className="w-5 h-5 text-white" /> },
    // { href: "/profile", label: "Profile", icon: <UserOutlined className="w-5 h-5 text-white" /> },
    {
      href: "/dashboard/buyer/home",
      label: "Dashboard",
      icon: <DollarCircleOutlined className="w-5 h-5 text-white" />,
    },
  ]

  return (
    <>
      <DashboardLayout links={navigationLinks}>
        <div className="relative h-48 w-full bg-gradient-to-r from-purple-600 to-pink-600">
          <Image src="/assets/images/banner.png" alt="Cryptocurrency Banner" fill className="object-cover opacity-50" />
        </div>

        <div className="relative -mt-20 px-8">
          <div className="flex flex-col items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-24%20at%2023.05.30-EYzJk5e1nUcL7OwILlB8oIlpVE6H0f.png"
              alt="Profile Avatar"
              width={160}
              height={160}
              className="rounded-full border-4 border-black"
            />
            <h1 className="mt-4 text-2xl font-bold">Giddon Gordons</h1>
          </div>
        </div>
        <div className="mt-8">
          <Tabs
            defaultActiveKey="appointments"
            className="custom-tabs"
            items={[
              {
                key: "tools",
                label: "Purchased Tools",
                children: (
                  <Card className="bg-zinc-900/50 border-zinc-800 mt-6">
                    {resources.length > 0 ? (
                      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {resources.map((resource, i) => (
                          <Card key={i} className="bg-zinc-900 border-zinc-800">
                            <div className="flex items-start gap-4">
                              <Avatar size={48} src={resource.avatar} className="bg-purple-600" />
                              <div className="flex-1">
                                <h3 className="font-semibold text-white">{resource.title}</h3>
                                <p className="mt-2 text-sm text-zinc-400">{resource.description}</p>
                                <div className="mt-4 flex items-center justify-between">
                                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                                    <span>1 PDF</span>
                                    <FileTextOutlined />
                                  </div>
                                  <span className="text-emerald-500">{resource.price}</span>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center py-8">
                        <p className="text-zinc-400">No Tools yet</p>
                      </div>
                    )}
                  </Card>
                ),
              },
              {
                key: "appointments",
                label: "Upcoming Appointments",
                children: (
                  <Card className="bg-zinc-900/50 border-zinc-800 mt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg text-white font-medium">Upcoming Appointments</h3>
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 text-xs font-medium text-emerald-500">
                          {appointments.length}
                        </span>
                      </div>
                      <Button
                        onClick={showViewAllModal}
                        type="link"
                        className="text-emerald-500 hover:text-emerald-400"
                      >
                        View All
                      </Button>
                    </div>
                    {appointments.length > 0 ? (
                      <div className="grid gap-2">
                        {appointments.map((appointment) => (
                          <div
                            key={appointment.id}
                            className="flex items-center justify-between rounded-lg bg-zinc-900/50 p-4 hover:bg-zinc-900/80 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <Avatar size={32} src={appointment.avatar} className="bg-blue-600" />
                              <div className="flex flex-col">
                                <span className="font-medium text-white">{appointment.username}</span>
                                <div className="flex items-center gap-2 text-sm text-zinc-400">
                                  <CalendarOutlined className="h-4 w-4" />
                                  <span>
                                    {appointment.date} {appointment.time}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <Button
                              onClick={() => showDetailsModal(appointment)}
                              type="text"
                              className="text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10"
                            >
                              Details
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 gap-4">
                        <p className="text-zinc-400">No Appointments yet</p>
                        <Button
                          type="default"
                          icon={<CalendarOutlined />}
                          className="border-emerald-500 text-emerald-500 hover:text-emerald-400 hover:border-emerald-400 bg-transparent"
                        >
                          Set Availability
                        </Button>
                      </div>
                    )}
                  </Card>
                ),
              },
            ]}
          />
        </div>

        {/* View All Modal */}
        <Modal
          title="All Upcoming Appointments"
          open={isViewAllModalVisible}
          onCancel={handleModalClose}
          footer={null}
          className="custom-modal "
        >
          <div className="grid gap-4 max-h-[60vh]  overflow-y-auto ">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between rounded-lg bg-zinc-800 p-4">
                <div className="flex items-center gap-3">
                  <Avatar size={40} src={appointment.avatar} className="bg-blue-600" />
                  <div className="flex flex-col">
                    <span className="font-medium ">{appointment.username}</span>
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <CalendarOutlined className="h-4 w-4" />
                      <span>
                        {appointment.date} {appointment.time}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  type="text"
                  className="text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/10"
                  onClick={() => showDetailsModal(appointment)}
                >
                  Details
                </Button>
              </div>
            ))}
          </div>
        </Modal>

        {/* Details Modal */}
        <Modal
          title="Appointment Details"
          open={isDetailsModalVisible}
          onCancel={handleModalClose}
          footer={null}
          className="custom-modal"
        >
          {selectedAppointment && (
            <div className="flex flex-col  gap-6">
              <div className="flex items-start gap-4">
                <Avatar size={64} src={selectedAppointment?.avatar || undefined} className="bg-blue-600" />
                <div>
                  <h3 className="text-xl font-semibold mb-1">{selectedAppointment?.username}</h3>
                  <div className="flex items-center gap-2 text-zinc-400">
                    <CalendarOutlined className="h-4 w-4" />
                    <span>
                      {selectedAppointment?.date} {selectedAppointment?.time}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-lg">Appointment Notes</h4>
                <p className="text-zinc-400 bg-zinc-800 p-4 rounded-lg">No notes available for this appointment.</p>
              </div>
              <div className="flex justify-end gap-4 mt-2">
                <Button
                  type="default"
                  className="border-emerald-500 text-emerald-500 hover:text-emerald-400 hover:border-emerald-400 bg-transparent"
                >
                  Reschedule
                </Button>
                <Button type="primary" className="bg-emerald-500 hover:bg-emerald-600 border-none">
                  Join Meeting
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </DashboardLayout>
      <style jsx global>{`
        .custom-tabs .ant-tabs-nav::before {
          border-bottom: 1px solid rgb(63 63 70);
        }
        .custom-tabs .ant-tabs-tab {
          color: rgb(161 161 170);
          padding: 12px 0;
          margin: 0 16px 0 0;
        }
        .custom-tabs .ant-tabs-tab:hover {
          color: white;
        }
        .custom-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
          color: rgb(34 197 94);
        }
        .custom-tabs .ant-tabs-ink-bar {
          background: rgb(34 197 94);
        }
        .ant-card {
          background: transparent;
        }
        .ant-btn-text:hover {
          background-color: rgba(34, 197, 94, 0.1) !important;
        }
        .ant-btn-default {
          border-color: rgb(34 197 94);
          color: rgb(34 197 94);
        }
        .ant-btn-default:hover {
          border-color: rgb(34 197 94);
          color: rgb(34 197 94);
          opacity: 0.8;
        }
        .ant-btn-link {
          color: rgb(34 197 94);
        }
        .ant-btn-link:hover {
          color: rgb(34 197 94);
          opacity: 0.8;
        }
        .custom-modal .ant-modal-content,
        .custom-modal .ant-modal-header {
          background-color: rgb(24 24 27);
          color: white;
        }
        .custom-modal .ant-modal-title {
          color: white;
        }
        .custom-modal .ant-modal-close-x {
          color: rgb(161 161 170);
        }
      `}</style>
    </>
  )
}

export default BuyerHome

