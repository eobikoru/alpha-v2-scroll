"use client"

import { useState, useMemo } from "react"
import { Modal, Button, Calendar } from "antd"
import { ArrowLeftOutlined } from "@ant-design/icons"
import Image from "next/image"
import { useRouter } from "next/navigation"
import type { Dayjs } from "dayjs"
import type { Router } from "next/router"

interface BookSessionModalProps {
  isOpen: boolean
  onClose: () => void
  creator: {
    name: string
    title: string
    avatar: string
  },
  router?: Router // Add router prop
}

type ModalView = "calendar" | "time-slots" | "confirmation" | "payment" | "success"

export function BookSessionModal({ isOpen, onClose, creator }: BookSessionModalProps) {
  const router = useRouter()
  const [currentView, setCurrentView] = useState<ModalView>("calendar")
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  // Generate 10 random numbers between 1-30
  const disabledDates = useMemo(() => {
    const randomNumbers = new Set<number>()
    while (randomNumbers.size < 10) {
      randomNumbers.add(Math.floor(Math.random() * 30) + 1)
    }
    return Array.from(randomNumbers)
  }, [])

  const timeSlots = ["12:15 PM", "11:15 PM", "9:15 PM", "1:15 PM"]

  const handleContinue = () => {
    if (currentView === "calendar" && selectedDate) {
      setCurrentView("time-slots")
    } else if (currentView === "time-slots" && selectedTime) {
      setCurrentView("confirmation")
    }
  }
 
  const handlePaymentSuccess = () => {
    setCurrentView("success")
  }


  const handleGoToDashboard = () => {
    router.push("/dashboard")
    onClose()
  }

  const handleConfirmBooking = () => {
    setCurrentView("payment")
  }

  const handlePayment = () => {
    router.push("/dashboard")
    onClose()
  }

  const handleBack = () => {
    if (currentView === "payment") {
      setCurrentView("confirmation")
    } else if (currentView === "confirmation") {
      setCurrentView("time-slots")
    } else if (currentView === "time-slots") {
      setCurrentView("calendar")
    } else if (currentView === "calendar") {
      onClose()
    }
  }

  const disabledDate = (current: Dayjs) => {
    return disabledDates.includes(current.date())
  }

  const renderCalendarView = () => (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-shrink-0">
        <div className="flex items-center gap-4 mb-8">
          <Image
            src={creator.avatar || "/placeholder.svg"}
            alt={creator.name}
            width={64}
            height={64}
            className="rounded-full"
          />
          <div>
            <h3 className="text-xl font-semibold text-white">{creator.name}</h3>
            <p className="text-zinc-400">Footballer that trades</p>
          </div>
        </div>
        <div>
          <h4 className="text-zinc-400 text-lg mb-2">Session Duration</h4>
          <p className="text-2xl font-semibold text-white">60 Mins</p>
        </div>
      </div>

      <div className="flex-1">
        <h2 className="text-2xl font-semibold text-white mb-2">Select Date and Time</h2>
        <p className="text-zinc-400 mb-4">In your local timezone</p>

        <Calendar
          fullscreen={false}
          className="booking-calendar"
          onChange={(date) => setSelectedDate(date)}
          disabledDate={disabledDate}
        />

        <button
          className="w-full h-12 mt-6 bg-[#D1FF7C] hover:bg-[#c1ef6c] text-black font-medium text-base disabled:bg-[#D1FF7C] disabled:hover:bg-[#D1FF7C] disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!selectedDate}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  )

  const renderTimeSlots = () => (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-shrink-0">
        <div className="flex items-center gap-4 mb-8">
          <Image
            src={creator.avatar || "/placeholder.svg"}
            alt={creator.name}
            width={64}
            height={64}
            className="rounded-full"
          />
          <div>
            <h3 className="text-xl font-semibold text-white">{creator.name}</h3>
            <p className="text-zinc-400">Footballer that trades</p>
          </div>
        </div>
        <div>
          <h4 className="text-zinc-400 text-lg mb-2">Session Duration</h4>
          <p className="text-2xl font-semibold text-white">60 Mins</p>
        </div>
      </div>

      <div className="flex-1">
        <h2 className="text-2xl font-semibold text-white mb-2">Select Date and Time</h2>
        <p className="text-zinc-400 mb-4">In your local timezone</p>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-white">Date: {selectedDate?.format("dddd MMM D")}</span>
            <button className="text-[#D1FF7C] text-sm hover:underline" onClick={() => setCurrentView("calendar")}>
              Change
            </button>
          </div>

          <h3 className="text-lg font-medium text-white mb-4">Available Time Slots</h3>
          <div className="grid grid-cols-2 gap-4">
            {timeSlots.map((time, index) => (
              <button
                key={index}
                className={`p-4 rounded text-white text-center transition-colors ${
                  selectedTime === time ? "bg-[#D1FF7C] text-zinc-800" : "bg-zinc-900 hover:bg-zinc-800"
                }`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <button
          className="w-full h-12 bg-[#D1FF7C] hover:bg-[#c1ef6c] text-black font-medium text-base disabled:bg-[#D1FF7C] disabled:hover:bg-[#D1FF7C] disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!selectedTime}
          onClick={handleContinue}
        >
          Continue
        </button>
      </div>
    </div>
  )

  const renderConfirmationView = () => (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-shrink-0">
        <div className="flex items-center gap-4 mb-8">
          <Image
            src={creator.avatar || "/placeholder.svg"}
            alt={creator.name}
            width={64}
            height={64}
            className="rounded-full"
          />
          <div>
            <h3 className="text-xl font-semibold text-white">{creator.name}</h3>
            <p className="text-zinc-400">Footballer that trades</p>
          </div>
        </div>
        <div>
          <h4 className="text-zinc-400 text-lg mb-2">Session Duration</h4>
          <p className="text-2xl font-semibold text-white">60 Mins</p>
        </div>
      </div>

      <div className="flex-1">
        <h2 className="text-2xl font-semibold text-white mb-2">Confirm Your Booking</h2>
        <p className="text-zinc-400 mb-8">In your local timezone</p>

        <div className="space-y-6 mb-8">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Date:</span>
              <div className="flex items-center gap-2">
                <span className="text-white">{selectedDate?.format("dddd MMM D")}</span>
                <button className="text-[#D1FF7C] text-sm hover:underline" onClick={() => setCurrentView("calendar")}>
                  Change
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-zinc-400">Time:</span>
              <span className="text-white">{selectedTime}</span>
            </div>
          </div>
        </div>

        <button
          className="w-full h-12 bg-[#D1FF7C] hover:bg-[#c1ef6c] text-black font-medium text-base"
          onClick={handleConfirmBooking}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  )

  const renderPaymentView = () => (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-4 mb-8">
        <Image
          src={creator.avatar || "/placeholder.svg"}
          alt={creator.name}
          width={64}
          height={64}
          className="rounded-full"
        />
        <div>
          <h3 className="text-xl font-semibold text-white">{creator.name}</h3>
          <p className="text-zinc-400">Footballer that trades</p>
        </div>
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h3 className="text-zinc-400 mb-2">Total amount</h3>
          <p className="text-4xl font-semibold text-white">300KYA</p>
        </div>

        <div className="space-y-4">
        <button
            className="w-full h-12 bg-[#D1FF7C] hover:bg-[#c1ef6c] text-black font-medium text-base rounded-md"
            onClick={handlePaymentSuccess}
          >
            Make Payment
          </button>
         
        </div>
      </div>
    </div>
  )

  const renderSuccessView = () => (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="w-16 h-16 rounded-full bg-[#D1FF7C]/20 flex items-center justify-center mb-6">
        <div className="w-8 mx-auto h-8 text-[#D1FF7C] text-xl">✓</div>
      </div>

      <h2 className="text-2xl font-semibold text-white mb-2">Booking Successful</h2>
      <p className="text-zinc-400 text-center mb-8 max-w-sm">
        Your payment has been processed successfully, and the appointment has been added to your dashboard
      </p>

      <button
        className="w-full max-w-md h-12 bg-[#D1FF7C] hover:bg-[#c1ef6c] text-black font-medium text-base rounded-md"
        onClick={handleGoToDashboard}
      >
        Go to Dashboard
      </button>
    </div>
  )
  return (
    <Modal open={isOpen} onCancel={onClose} footer={null} width={900} className="booking-modal" closeIcon={null}>
        <div className="p-6">
     {
        currentView === "success" ? null : (
            <>
         <button onClick={handleBack} className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8">
          <ArrowLeftOutlined /> Back
        </button>

            </>
        )
     }
       
        {currentView === "calendar" && renderCalendarView()}
        {currentView === "time-slots" && renderTimeSlots()}
        {currentView === "confirmation" && renderConfirmationView()}
        {currentView === "payment" && renderPaymentView()}
        {currentView === "success" && renderSuccessView()}
      </div>

      <style jsx global>{`
        .booking-modal .ant-modal-content {
          background: rgb(32 32 35);
          padding: 0;
          border-radius: 1rem;
        }
        .booking-modal .ant-modal-body {
          padding: 0;
        }
        .booking-calendar.ant-picker-calendar {
          background: transparent;
        }
        .booking-calendar .ant-picker-panel {
          background: transparent;
        }
        .booking-calendar .ant-picker-calendar-header {
          padding: 12px 0;
          justify-content: space-between;
        }
        .booking-calendar .ant-picker-calendar-header button {
          color: white;
        }
        .booking-calendar .ant-picker-calendar-header .ant-picker-calendar-month-select,
        .booking-calendar .ant-picker-calendar-header .ant-picker-calendar-year-select {
          color: white;
        }
        .booking-calendar .ant-picker-content th {
          color: rgb(161 161 170);
        }
        .booking-calendar .ant-picker-calendar-date {
          color: white;
          border-radius: 4px;
        }
        .booking-calendar .ant-picker-calendar-date-today {
          background: rgba(209, 255, 124, 0.1);
          border-color: #D1FF7C;
        }
        .booking-calendar .ant-picker-calendar-date-selected {
          background: #D1FF7C !important;
          color: black !important;
        }
        .booking-calendar .ant-picker-calendar-date:hover {
          background: rgba(209, 255, 124, 0.2);
        }
        .booking-calendar .ant-picker-calendar-date-disabled {
          background: rgba(128, 128, 128, 0.3);
          cursor: not-allowed;
        }
        .booking-calendar .ant-picker-calendar-date-disabled:hover {
          background: rgba(128, 128, 128, 0.3);
        }
        .booking-calendar .ant-picker-calendar-date-value {
          color: white;
        }
        .booking-calendar .ant-picker-calendar-date-disabled .ant-picker-calendar-date-value {
          color: rgba(255, 255, 255, 0.7);
          opacity: 1;
          border: 1px solid white;
          border-radius: 50%;
          display: inline-block;
          width: 24px;
          height: 24px;
          line-height: 22px;
          text-align: center;
          background-color: red;
        }
      `}</style>
    </Modal>
  )
}

