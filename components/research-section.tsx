import { ArrowUpRight, Clock3, FileText } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const reports = [
  { type: 'Architecture', title: 'Designing a Multi-Agent Research Workflow', summary: 'How researcher, adversary, and judge roles reduce confirmation bias in autonomous synthesis.', read: '12 min read', featured: true },
  { type: 'Field note', title: 'Why citations alone don’t make AI research trustworthy', summary: 'Traceability is necessary. Contestability is what turns sources into decisions.', read: '6 min read' },
  { type: 'Framework', title: 'A confidence rubric for agent-generated claims', summary: 'A practical scoring model for evidence quality, agreement, recency, and relevance.', read: '8 min read' },
]

export function ResearchSection() {
  return (
    <section id="research" className="border-b border-border py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary">Published thinking</p>
            <h2 className="text-balance text-4xl font-semibold tracking-[-0.035em] md:text-5xl">The research behind the product.</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">We publish the architecture, tradeoffs, and evaluation logic—not just the output.</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {reports.map((report, index) => (
            <article key={report.title} className={`group flex min-h-72 flex-col rounded-3xl border border-border bg-card p-6 transition-colors hover:border-primary/40 md:p-8 ${index === 0 ? 'lg:row-span-2 lg:min-h-[36rem]' : ''}`}>
              <div className="flex items-start justify-between gap-4">
                <Badge variant="secondary">{report.type}</Badge>
                <ArrowUpRight className="text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" aria-hidden="true" />
              </div>
              {report.featured && (
                <div className="my-auto flex items-center justify-center py-10">
                  <div className="flex size-36 items-center justify-center rounded-full border border-primary/30 bg-primary/5 text-primary">
                    <FileText className="size-14" strokeWidth={1.2} aria-hidden="true" />
                  </div>
                </div>
              )}
              <div className="mt-auto">
                <h3 className={`${report.featured ? 'text-3xl' : 'text-2xl'} text-balance font-semibold tracking-tight`}>{report.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{report.summary}</p>
                <p className="mt-5 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground"><Clock3 aria-hidden="true" />{report.read}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
