import React from "react";
import { Check } from "lucide-react";

interface Step {
  id: number;
  label: string;
  sublabel?: string;
}

interface RouteProgressProps {
  steps: Step[];
  currentStep: number; // 1-indexed
  className?: string;
}

export default function RouteProgress({
  steps,
  currentStep,
  className = ""
}: RouteProgressProps) {
  return (
    <div className={`w-full py-4 ${className}`}>
      <div className="flex items-center justify-between relative max-w-xl mx-auto">
        {/* Continuous Dashed Connecting Line */}
        <div className="absolute top-4 left-6 right-6 h-0.5 border-t-2 border-dashed border-border -z-0" />

        {steps.map((step) => {
          const isCompleted = step.id < currentStep;
          const isActive = step.id === currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center relative z-10">
              {/* Dot / Badge */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                  isCompleted
                    ? "bg-sage text-white shadow-md ring-4 ring-sage-light"
                    : isActive
                    ? "bg-terracotta text-white shadow-lg ring-4 ring-terracotta-light scale-110"
                    : "bg-white text-charcoal-light border-2 border-border"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : (
                  <span>0{step.id}</span>
                )}
              </div>

              {/* Step Label */}
              <span
                className={`mt-2 text-xs font-semibold tracking-wide ${
                  isActive
                    ? "text-terracotta font-bold"
                    : isCompleted
                    ? "text-sage font-medium"
                    : "text-charcoal-light/60"
                }`}
              >
                {step.label}
              </span>
              {step.sublabel && (
                <span className="text-[10px] text-charcoal-light/50 font-normal">
                  {step.sublabel}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
