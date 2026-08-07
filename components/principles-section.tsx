import { Quote } from 'lucide-react'

const principles = [
  ['Trace every claim', 'Every conclusion links back to the source evidence and the agent that interpreted it.'],
  ['Show the disagreement', 'Counterevidence and unresolved tensions remain visible instead of being averaged away.'],
  ['Calibrate confidence', 'The system distinguishes what is known, inferred, contested, and still worth testing.'],
]

export function PrinciplesSection() {
  return (
    <section id="principles" className="border-b border-border bg-card/40 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <div>
            <Quote className="mb-7 text-primary" aria-hidden="true" />
            <blockquote className="text-balance text-3xl font-medium leading-tight tracking-[-0.03em] md:text-4xl">
              “Good research doesn’t remove uncertainty. It makes uncertainty legible.”
            </blockquote>
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">Product principle / 001</p>
          </div>
          <div className="flex flex-col border-t border-border">
            {principles.map(([title, copy]) => (
              <div key={title} className="grid gap-3 border-b border-border py-7 sm:grid-cols-[12rem_1fr]">
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
