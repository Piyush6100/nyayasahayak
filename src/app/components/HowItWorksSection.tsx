import React from 'react';

const steps = [
  { id: 'how-01', number: '01', title: 'Tell us what happened', description: 'Describe your situation in plain language — no legal jargon required.' },
  { id: 'how-02', number: '02', title: 'AI understands your situation', description: 'NyayaSahayak interprets your problem and identifies the relevant civic or legal context.' },
  { id: 'how-03', number: '03', title: 'Relevant information is retrieved', description: 'Official sources, acts, and guidelines are surfaced and cited for transparency.' },
  { id: 'how-04', number: '04', title: 'Your options are explained', description: 'Possible paths forward are laid out clearly, with pros and cons where relevant.' },
  { id: 'how-05', number: '05', title: 'Your next steps are prepared', description: 'A clear, prioritised action plan is created based on your specific situation.' },
  { id: 'how-06', number: '06', title: 'Generate the document you need', description: 'RTI applications, legal notices, complaints — generated and ready to submit.' },
];

export default function HowItWorksSection() {
  return (
    <section className="py-16 lg:py-24 bg-secondary/40" aria-labelledby="how-it-works-heading">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8 xl:px-10">
        <div className="text-center mb-14">
          <h2 id="how-it-works-heading" className="text-[1.75rem] lg:text-[2rem] font-bold text-foreground mb-3">
            From confusion to action.
          </h2>
          <p className="text-[15px] text-muted-foreground max-w-lg mx-auto">
            A guided process that takes you from not knowing where to start to having a clear path forward.
          </p>
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:block relative">
          <div className="absolute top-[28px] left-[8.33%] right-[8.33%] h-px bg-border z-0" aria-hidden="true" />
          <div className="grid grid-cols-6 gap-4 relative z-10">
            {steps?.map((step) => (
              <div key={step?.id} className="flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-card border-2 border-border flex items-center justify-center shadow-card">
                  <span className="text-[15px] font-bold text-primary">{step?.number}</span>
                </div>
                <div>
                  <h3 className="text-[13px] font-semibold text-foreground mb-1.5 leading-snug">{step?.title}</h3>
                  <p className="text-[12px] text-muted-foreground leading-relaxed">{step?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="lg:hidden flex flex-col gap-0">
          {steps?.map((step, index) => (
            <div key={step?.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-xl bg-card border-2 border-border flex items-center justify-center shadow-sm flex-shrink-0">
                  <span className="text-[13px] font-bold text-primary">{step?.number}</span>
                </div>
                {index < steps?.length - 1 && (
                  <div className="w-px flex-1 bg-border my-2" aria-hidden="true" />
                )}
              </div>
              <div className={`pb-6 ${index === steps?.length - 1 ? '' : ''}`}>
                <h3 className="text-[14px] font-semibold text-foreground mb-1">{step?.title}</h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{step?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}