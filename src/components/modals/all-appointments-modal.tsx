"use client";

import { useState } from "react";
import { Modal } from "antd";
import { ArrowLeft, Calendar, Search } from "lucide-react";
import Image from "next/image";
export interface Appointment {
  id: string;
  creator: `0x${string}`;
  timestamp: number;
  isBooked: boolean;
  status: "upcoming" | "completed" | "cancelled";
}

interface AllAppointmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
  onAppointmentClick: (appointment: Appointment) => void;
}

export function AllAppointmentsModal({
  isOpen,
  onClose,
  appointments,
  onAppointmentClick,
}: AllAppointmentsModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "upcoming" | "completed" | "cancelled"
  >("all");

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch = appointment.creator
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      selectedFilter === "all" || appointment.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  function formatTimestamp(unixTimestamp: BigInt | number): string {
    const timestampInMs = Number(unixTimestamp) * 1000;
    const date = new Date(timestampInMs);
    return date.toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  }

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
          <h2 className="text-xl font-semibold text-white">All Appointments</h2>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-800 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
          </div>
          <div className="flex gap-2">
            {(["all", "upcoming", "completed", "cancelled"] as const).map(
              (filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                    selectedFilter === filter
                      ? "bg-lime-400 text-black"
                      : "bg-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              )
            )}
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {filteredAppointments.map((appointment) => (
            <button
              key={appointment.id}
              onClick={() => onAppointmentClick(appointment)}
              className="w-full flex items-center justify-between bg-zinc-800/50 rounded-lg p-4 hover:bg-zinc-800 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="text-left">
                  <h3 className="font-medium text-white">
                    {appointment.creator &&
                    appointment.creator.length > 3 * 2 + 2
                      ? `${appointment.creator.slice(
                          0,
                          6
                        )}.....${appointment.creator.slice(-5)}`
                      : appointment.creator}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <Calendar className="w-4 h-4" />
                    <span>{formatTimestamp(appointment.timestamp)}</span>
                  </div>
                </div>
              </div>
              <span
                className={`
                px-2 py-1 rounded-full text-xs bg-red-400/20 text-red-400
              `}
              >
                Available
              </span>
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}
