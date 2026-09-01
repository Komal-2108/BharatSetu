"use client";

import React, { useState } from "react";
import { Sparkles, X, Check, Copy, Wand2 } from "lucide-react";

interface AiDescModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDescription: (desc: string) => void;
  initialTitle?: string;
  category?: string;
  location?: string;
}

export default function AiDescModal({
  isOpen,
  onClose,
  onSelectDescription,
  initialTitle = "",
  category = "homestay",
  location = "Ujjain"
}: AiDescModalProps) {
  const [generating, setGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [language, setLanguage] = useState<"en" | "hi">("hi");

  if (!isOpen) return null;

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      let result = "";
      if (language === "hi") {
        result = `पवित्र ${location || "उज्जैन"} में आपका हार्दिक स्वागत है। हमारा ${category === "homestay" ? "होमस्टे" : "अनुभव"} आपको प्रामाणिक स्थानीय संस्कृति, घर के बने स्वादिष्ट सात्विक व्यंजन और शांतिपूर्ण वातावरण प्रदान करता है। मंदिर दर्शन और स्थानीय संस्कृति के लिए संपूर्ण मार्गदर्शन उपलब्ध है।`;
      } else {
        result = `Welcome to sacred ${location || "Ujjain"}! Experience authentic local hospitality with our verified ${category}. Enjoy organic home-cooked meals, peaceful traditional ambience, and personal local guidance for temple darshan and heritage walks.`;
      }
      setGeneratedText(result);
      setGenerating(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-charcoal/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden border-2 border-border shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-terracotta text-white flex items-center justify-center font-bold text-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-charcoal">Bharat AI Listing Generator</h3>
              <span className="text-[10px] text-sage font-bold uppercase tracking-wider block">AI Assistant for Local Vendors</span>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded-lg text-charcoal-light hover:bg-sand">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options */}
        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-charcoal">Select Output Language:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setLanguage("hi")}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  language === "hi" ? "bg-terracotta text-white" : "bg-sand text-charcoal"
                }`}
              >
                हिन्दी (Hindi)
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  language === "en" ? "bg-terracotta text-white" : "bg-sand text-charcoal"
                }`}
              >
                English
              </button>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full bg-terracotta hover:bg-terracotta-dark text-white font-bold py-3 rounded-xl shadow-warm flex items-center justify-center gap-2 transition-all"
          >
            {generating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Crafting AI Description...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>Generate Description Now</span>
              </>
            )}
          </button>
        </div>

        {/* Output Display */}
        {generatedText && (
          <div className="bg-sand/60 rounded-2xl p-4 border border-border space-y-3 text-xs">
            <span className="font-bold text-terracotta block text-[11px]">AI Generated Copy:</span>
            <p className="text-charcoal leading-relaxed">{generatedText}</p>
            <button
              onClick={() => {
                onSelectDescription(generatedText);
                onClose();
              }}
              className="w-full bg-sage text-white font-bold py-2 rounded-xl flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Check className="w-4 h-4" />
              Use This Copy in Listing
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
