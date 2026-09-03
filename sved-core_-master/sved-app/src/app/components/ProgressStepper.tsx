import { Check } from "lucide-react";

interface Step {
  label: string;
  number: number;
}

interface ProgressStepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function ProgressStepper({ steps, currentStep, className = "" }: ProgressStepperProps) {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.number;
        const isCurrent = currentStep === step.number;
        const isUpcoming = currentStep < step.number;

        return (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div className="flex items-center w-full">
                {/* Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300
                    ${isCompleted ? "bg-green-verified text-white" : ""}
                    ${isCurrent ? "bg-blue-medium text-white ring-4 ring-blue-medium/20" : ""}
                    ${isUpcoming ? "bg-gray-light text-gray-medium" : ""}
                  `}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : step.number}
                </div>

                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 mx-2">
                    <div
                      className={`h-full transition-all duration-300
                        ${isCompleted ? "bg-green-verified" : "bg-gray-light"}
                      `}
                    />
                  </div>
                )}
              </div>

              {/* Label */}
              <span
                className={`mt-2 text-sm font-medium text-center
                  ${isCurrent ? "text-blue-medium" : "text-gray-medium"}
                `}
              >
                {step.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
