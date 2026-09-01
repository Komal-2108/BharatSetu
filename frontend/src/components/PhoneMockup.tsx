import React from "react";
import { MessageSquare, CheckCheck, Phone, Video, MoreVertical } from "lucide-react";

interface PhoneMockupProps {
  customerName?: string;
  vendorName?: string;
  vendorPhone?: string;
  serviceTitle?: string;
  bookingDate?: string;
  bookingId?: string;
  status?: string;
  customMessage?: string;
  className?: string;
}

export default function PhoneMockup({
  customerName = "Aarav Sharma",
  vendorName = "Ramesh Sharma",
  vendorPhone = "+91 98765 43210",
  serviceTitle = "Narmada Riverfront Heritage Homestay",
  bookingDate = "2026-09-05",
  bookingId = "BK-8921",
  status = "CONFIRMED",
  customMessage,
  className = ""
}: PhoneMockupProps) {
  const timeStr = "12:35 PM";

  return (
    <div className={`relative mx-auto w-full max-w-[340px] bg-charcoal rounded-[36px] p-3 shadow-2xl border-4 border-charcoal-light/30 ${className}`}>
      {/* Phone Camera Notch */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-charcoal rounded-full z-20 flex items-center justify-center">
        <div className="w-2.5 h-2.5 bg-black rounded-full mr-2" />
        <div className="w-1.5 h-1.5 bg-charcoal-light/60 rounded-full" />
      </div>

      {/* Screen Frame */}
      <div className="relative bg-[#ECE5DD] rounded-[28px] overflow-hidden text-charcoal flex flex-col h-[520px] border border-gray-300">
        
        {/* WhatsApp Header */}
        <div className="bg-[#075E54] text-white px-3 pt-6 pb-2.5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-terracotta text-white font-bold flex items-center justify-center text-xs shadow-inner">
              BS
            </div>
            <div>
              <h4 className="font-bold text-xs leading-tight">BharatSetu Alerts</h4>
              <span className="text-[10px] text-green-200 block">Official Verified Business</span>
            </div>
          </div>
          <div className="flex items-center gap-3 text-white/90">
            <Video className="w-4 h-4 cursor-pointer" />
            <Phone className="w-4 h-4 cursor-pointer" />
            <MoreVertical className="w-4 h-4 cursor-pointer" />
          </div>
        </div>

        {/* WhatsApp Chat Body */}
        <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:16px_16px]">
          
          {/* Encryption Badge */}
          <div className="text-center my-1">
            <span className="bg-[#FFEECD] text-[#856404] text-[10px] px-2.5 py-1 rounded-md shadow-2xs font-medium inline-block">
              🔒 End-to-end encrypted notification
            </span>
          </div>

          {/* Incoming Message Bubble */}
          <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm max-w-[90%] text-xs border border-gray-100 relative">
            <p className="font-bold text-[#075E54] mb-1">🌟 BharatSetu Booking Update</p>
            
            {customMessage ? (
              <p className="text-gray-800 leading-relaxed whitespace-pre-line">{customMessage}</p>
            ) : (
              <div className="space-y-1.5 text-gray-700">
                <p>Namaste <b>{customerName}</b>! Your booking request has been processed.</p>
                <div className="bg-sand/60 p-2 rounded border border-border text-[11px] space-y-0.5">
                  <p><b>Booking ID:</b> {bookingId}</p>
                  <p><b>Service:</b> {serviceTitle}</p>
                  <p><b>Date:</b> {bookingDate}</p>
                  <p><b>Host:</b> {vendorName} ({vendorPhone})</p>
                </div>
                <p className="text-[11px] font-semibold text-sage-dark pt-0.5">
                  Status: <span className="uppercase text-terracotta">{status}</span>
                </p>
              </div>
            )}

            <div className="flex items-center justify-end gap-1 mt-1.5 text-[9px] text-gray-400">
              <span>{timeStr}</span>
              <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
            </div>
          </div>

          {/* Quick Action Button Simulation */}
          <div className="bg-white/95 rounded-lg p-2 text-center text-xs font-semibold text-[#00A884] shadow-sm cursor-pointer hover:bg-gray-50 border border-gray-200">
            💬 Reply to Contact Provider
          </div>
        </div>

        {/* Fake Input Footer */}
        <div className="bg-[#F0F2F5] p-2 flex items-center gap-2 border-t border-gray-300">
          <div className="flex-1 bg-white rounded-full px-3 py-1.5 text-[11px] text-gray-400 border border-gray-200">
            Type a message...
          </div>
          <div className="w-7 h-7 bg-[#00A884] rounded-full flex items-center justify-center text-white shadow-xs">
            <MessageSquare className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>
    </div>
  );
}
