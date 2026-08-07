import { CheckCircle2 } from 'lucide-react'
import { LeadForm } from '@/components/lead-form'

export function AccessSection() {
  return (
    <section id="access" className="py-24 lg:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[.85fr_1.15fr] lg:gap-20 lg:px-8">
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary">Prototype access</p>
          <h2 className="text-balance text-4xl font-semibold tracking-[-0.035em] md:text-5xl">Bring us one difficult question.</h2>
          <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
            We’re onboarding a small group of B2B teams to shape the product. Share your research challenge and we’ll show you how the agentic workflow handles it.
          </p>
          <ul className="mt-8 flex flex-col gap-4 text-sm">
            {['A tailored product walkthrough', 'One sample research brief', 'Direct influence on the roadmap'].map((item) => (
              <li key={item} className="flex items-center gap-3"><CheckCircle2 className="text-primary" aria-hidden="true" />{item}</li>
            ))}
          </ul>
        </div>
        <LeadForm />
      </div>
    </section>
  )
}
