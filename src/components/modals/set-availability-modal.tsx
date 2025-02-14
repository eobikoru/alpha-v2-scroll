"use client"

import { useEffect, useState } from "react"
import { Modal, Button } from "antd"
import { ArrowLeft, ArrowRight, ChevronDown, Check } from "lucide-react"
import { format } from "date-fns"
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi"
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/src/constant/constant"

interface SetAvailabilityModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SetAvailabilityModal({ isOpen, onClose }: SetAvailabilityModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedTime, setSelectedTime] = useState({
    hours: "06",
    minutes: "00",
    period: "PM",
  })
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const { writeContract, data: hash, isPending, isError } = useWriteContract()
  const { isSuccess: isSuccessHash } = useWaitForTransactionReceipt({
    hash,
  })

  // Generate calendar days
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDayOfMonth = new Date(year, month, 1).getDay()

    const days = []
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null)
    }
    // Add the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    return days
  }

  const days = getDaysInMonth(selectedDate)
  const weekDays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]

  const handlePrevMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))
  }

  const calculateUnixTimestamp = (): number => {
    const date = new Date(selectedDate)
    let hours = Number.parseInt(selectedTime.hours)

    // Convert to 24-hour format
    if (selectedTime.period === "PM" && hours !== 12) {
      hours += 12
    } else if (selectedTime.period === "AM" && hours === 12) {
      hours = 0
    }

    date.setHours(hours)
    date.setMinutes(Number.parseInt(selectedTime.minutes))
    date.setSeconds(0)
    date.setMilliseconds(0)

    // Convert to Unix timestamp (seconds)
    return Math.floor(date.getTime() / 1000)
  }

  const handleSave = async () => {
    const unixTimestamp = calculateUnixTimestamp()
    if (unixTimestamp) {
      try {
        await writeContract({
          abi: CONTRACT_ABI,
          address: CONTRACT_ADDRESS,
          functionName: "addConsultationSlot",
          args: [unixTimestamp],
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (isSuccessHash) {
      setIsSuccessModalOpen(true)
      onClose()
    }
  }, [isSuccessHash])

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false)
    onClose()
  }

  function SuccessModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    return (
      <Modal
        open={isOpen}
        onCancel={onClose}
        footer={null}
        width={480}
        className="[&_.ant-modal-content]:bg-zinc-900 [&_.ant-modal-content]:p-0"
        closable={false}
      >
        <div className="p-8 flex flex-col items-center text-center">
          <div className="w-12 h-12 bg-lime-400/20 rounded-full flex items-center justify-center mb-6">
            <Check className="w-6 h-6 text-lime-400" />
          </div>

          <h2 className="text-2xl font-semibold text-white mb-2">Availability Set Successfully!</h2>
          <p className="text-zinc-400 mb-8">
            Your availability has been successfully added to your profile.
            <br />
            What would you like to do next?
          </p>

          <button
            onClick={onClose}
            className="w-full bg-lime-400 text-black font-medium py-4 px-6 rounded-full hover:bg-lime-500 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </Modal>
    )
  }

  return (
    <>
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
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <h2 className="text-xl font-semibold text-white">Set date and time you are available for booking</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Calendar Section */}
            <div className="space-y-6">
              {/* Month Navigation */}
              <div className="flex items-center justify-between mb-4">
                <button onClick={handlePrevMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <ArrowLeft className="w-5 h-5 text-white" />
                </button>
                <span className="text-white font-medium">{format(selectedDate, "MMMM yyyy")}</span>
                <button onClick={handleNextMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <ArrowRight className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Weekday headers */}
                {weekDays.map((day) => (
                  <div key={day} className="h-8 flex items-center justify-center text-xs text-zinc-400">
                    {day}
                  </div>
                ))}

                {/* Calendar days */}
                {days.map((day, index) => (
                  <button
                    key={index}
                    disabled={day === null}
                    className={`
                      h-8 flex items-center justify-center rounded-full text-sm
                      ${day === null ? "invisible" : "text-white hover:bg-white/10"}
                      ${day === selectedDate.getDate() ? "bg-lime-400 text-black hover:bg-lime-500" : ""}
                    `}
                    onClick={() =>
                      day && setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))
                    }
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-white mb-4">Set time</h3>

              {/* Time Picker */}
              <div className="flex items-center gap-4">
                {/* Hours */}
                <div className="relative">
                  <select
                    value={selectedTime.hours}
                    onChange={(e) => setSelectedTime({ ...selectedTime, hours: e.target.value })}
                    className="appearance-none bg-zinc-800 text-white text-2xl font-medium px-4 py-2 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-lime-400"
                  >
                    {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0")).map((hour) => (
                      <option key={hour} value={hour}>
                        {hour}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" />
                </div>

                <span className="text-2xl font-medium text-white">:</span>

                {/* Minutes */}
                <div className="relative">
                  <select
                    value={selectedTime.minutes}
                    onChange={(e) =>
                      setSelectedTime({
                        ...selectedTime,
                        minutes: e.target.value,
                      })
                    }
                    className="appearance-none bg-zinc-800 text-white text-2xl font-medium px-4 py-2 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-lime-400"
                  >
                    {Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0")).map((minute) => (
                      <option key={minute} value={minute}>
                        {minute}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" />
                </div>

                {/* AM/PM */}
                <div className="relative">
                  <select
                    value={selectedTime.period}
                    onChange={(e) => setSelectedTime({ ...selectedTime, period: e.target.value })}
                    className="appearance-none bg-zinc-800 text-white text-2xl font-medium px-4 py-2 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-lime-400"
                  >
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-4 mt-8">
            <Button
              onClick={onClose}
              className="px-8 h-10 bg-transparent border border-zinc-700 text-white hover:text-white hover:border-zinc-600"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="px-8 h-10 bg-lime-400 border-lime-400 text-black hover:bg-lime-500 hover:border-lime-500"
            >
              {isPending ? "Saving" : "Save"}
            </Button>
          </div>
        </div>
      </Modal>
      <SuccessModal isOpen={isSuccessModalOpen} onClose={handleSuccessModalClose} />
    </>
  )
}

