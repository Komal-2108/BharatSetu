"use client";

import React, { useState } from "react";
import { X, MapPin, Compass, Navigation } from "lucide-react";
import { ServiceData } from "@/lib/mockData";

interface MapViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  services: ServiceData[];
}

export default function MapViewModal({ isOpen, onClose, services }: MapViewModalProps) {
  const [selectedService, setSelectedService] = useState<ServiceData | null>(services[0] || null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-charcoal/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl overflow-hidden border-2 border-border shadow-2xl flex flex-col h-[650px] relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-charcoal text-white p-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-terracotta" />
            <h3 className="font-serif font-bold text-lg">Hyperlocal BharatSetu Interactive Map</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body: Map Embed + Side Panel */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          
          {/* Map Embed Section */}
          <div className="lg:col-span-8 bg-sand relative flex items-center justify-center overflow-hidden">
            {/* Embedded Google Maps iframe centered on Central India */}
            <iframe
              title="BharatSetu Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.123!2d75.7849!3d23.1793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDEwJzQ1LjUiTiA3NcKwNDcnMDUuNiJF!5e0!3m2!1sen!2sin!4v1650000000000"
              className="w-full h-full grayscale-[20%] contrast-[105%]"
            />

            {/* Interactive Pins Overlay Simulation */}
            <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between">
              <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-border text-xs font-bold text-charcoal shadow-md">
                <Navigation className="w-4 h-4 text-terracotta animate-spin" />
                Showing {services.length} Local Destinations
              </div>
            </div>
          </div>

          {/* Side Panel: Listing Selector */}
          <div className="lg:col-span-4 bg-base p-4 overflow-y-auto space-y-3 border-l border-border">
            <h4 className="font-serif font-bold text-sm text-charcoal uppercase tracking-wider">
              Destinations on Map
            </h4>

            <div className="space-y-2">
              {services.map((srv) => (
                <div
                  key={srv.id}
                  onClick={() => setSelectedService(srv)}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                    selectedService?.id === srv.id
                      ? "bg-terracotta-light border-terracotta shadow-sm scale-[1.02]"
                      : "bg-white border-border hover:border-terracotta/40"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-terracotta capitalize">{srv.category}</span>
                    <span className="font-serif font-bold text-charcoal">₹{srv.price}</span>
                  </div>
                  <h5 className="font-serif font-bold text-xs text-charcoal line-clamp-1">
                    {srv.title}
                  </h5>
                  <span className="text-[10px] text-charcoal-light/70 flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-terracotta" /> {srv.location}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
