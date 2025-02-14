"use client"

import { useState } from "react"
import { DownOutlined } from "@ant-design/icons"

const faqData = [
  {
    question: "What is Alpha?",
    answer:
      "Alpha is a Web3-native platform where creators and Key Opinion Leaders (KOLs) monetize their expertise by sharing curated tools and offering time for consultations or mentorship sessions",
  },
  {
    question: "How can creators earn on Alpha?",
    answer: [
      "Sell curated lists of Web3 tools with personal insights",
      "Offer time slots for one-on-one consultations or mentorship",
      "Share unique links to their profiles or offerings on social media",
    ],
  },
  {
    question: "How do time bookings work?",
    answer:
      "Creators can set available time slots, and buyers can book these for personalized sessions like consultations, strategy planning, or mentorship",
  },
  {
    question: "What types of tools can creators share?",
    answer: ["DeFi tools", "Market analytics", "Community building", "Other Valuable insights"],
  },
  {
    question: "How are payments handled?",
    answer:
      "Payments are made using Kaia tokens, a native cryptocurrency. Buyers can seamlessly purchase toolkits or book time slots through the platform",
  },
  {
    question: "Is there social proof for creators?",
    answer:
      "Yes! Buyers can leave testimonials and ratings for toolkits and sessions, helping other users gauge the value of a creator's offerings",
  },
  {
    question: "How do creators share their profiles or toolkits?",
    answer:
      "Every profile, toolkit, and time slot has a unique, shareable link that can be promoted on platforms like Twitter, Instagram, and LinkedIn.",
  },
  {
    question: "Can creators bundle tools or offer discounted sessions?",
    answer:
      "Yes, creators can offer bundled pricing for multiple tools and special rates for time bookings as part of promotional campaigns or packages",
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="bg-black text-white py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-medium text-center mb-16">Frequently Asked Questions</h2>

        <div className="bg-[#111111] rounded-3xl p-8">
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div key={index} className="bg-black rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="text-lg text-white">{item.question}</span>
                  <DownOutlined
                    className={`text-[#d4ff8e] transition-transform duration-200 text-lg
                    ${openIndex === index ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ease-in-out
                  ${openIndex === index ? "max-h-96" : "max-h-0"}`}
                >
                  <div className="p-6 pt-0 text-gray-400">
                    {Array.isArray(item.answer) ? (
                      <ul className="list-disc pl-5 space-y-1">
                        {item.answer.map((point, i) => (
                          <li key={i}>{point}</li>
                        ))}
                      </ul>
                    ) : (
                      item.answer
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

