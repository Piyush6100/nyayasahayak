import React from 'react';
import { CheckCircle } from 'lucide-react';

interface Step {
  id: string;
  number: number;
  label: string;
  shortLabel: string;
}

interface Props {
  currentStep: number;
  steps: Step[];
}

export default function RTIStepHeader({ currentStep, steps }: Props) {
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className="mt-6">
      {/* Progress bar */}
      <div className="h-1.5 bg-muted rounded-full mb-5 overflow-hidden" role="progressbar" aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={steps.length} aria-label={`Step ${currentStep} of ${steps.length}`}>
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-smooth"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex items-center justify-between">
        {steps.map((step) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;
          return (
            <div key={step.id} className="flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted
                    ? 'bg-success text-success-foreground'
                    : isCurrent
                    ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                    : 'bg-muted text-muted-foreground'
                }`}
                aria-current={isCurrent ? 'step' : undefined}
              >
                {isCompleted ? (
                  <CheckCircle size={16} />
                ) : (
                  <span className="text-[12px] font-bold">{step.number}</span>
                )}
              </div>
              <span className={`text-[10px] font-medium hidden sm:block ${isCurrent ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted-foreground'}`}>
                {step.shortLabel}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}