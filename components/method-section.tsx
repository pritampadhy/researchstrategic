import { ArrowDown, BookOpen, Gavel, Search, Swords } from 'lucide-react'

const steps = [
  { icon: Search, tag: '01 / DISCOVER', title: 'Researcher maps the evidence', copy: 'Finds primary sources, extracts claims, and builds a traceable evidence graph around your question.' },
  { icon: Swords, tag: '02 / CHALLENGE', title: 'Critic attacks the thesis', copy: 'Actively searches for contradictions, weak assumptions, missing stakeholders, and contrary market signals.' },
  { icon: Gavel, tag: '03 / ADJUDICATE', title: 'Judge weighs both sides', copy: 'Scores the evidence, resolves conflicts, and produces a calibrated conclusion with explicit uncertainty.' },
  { icon: BookOpen, tag: '04 / PUBLISH', title: 'You receive the decision brief', copy: 'A structured, citation-ready report built for sharing with teams, customers, or investors.' },
]

export function MethodSection() {
  return (
    <section id="method" className="border-b border-border bg-card/40 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-14 grid gap-6 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary">The method</p>
            <h2 className="max-w-xl text-balance text-4xl font-semibold tracking-[-0.035em] md:text-5xl">A debate, not a data dump.</h2>
          </div>
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground lg:justify-self-end">
            Most research tools optimize for speed. Synthesis optimizes for intellectual honesty—making disagreement part of the system, not an afterthought.
          </p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <article key={step.tag} className="flex min-h-72 flex-col bg-background p-6 lg:p-7">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-wider text-primary">{step.tag}</span>
                <step.icon className="text-muted-foreground" aria-hidden="true" />
              </div>
              <div className="mt-auto flex flex-col gap-3 pt-12">
                <h3 className="text-xl font-semibold tracking-tight">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.copy}</p>
              </div>
              {index < steps.length - 1 && <ArrowDown className="mt-5 text-primary md:hidden" aria-hidden="true" />}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
