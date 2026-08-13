import Link from 'next/link'
import { ArrowRight, Check, FileSearch, Scale, ShieldCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border">
      <div className="mx-auto grid min-h-[720px] max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24">
        <div className="flex flex-col items-start gap-7">
          <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">
            Agentic research, built for decisions
          </Badge>
          <div className="flex flex-col gap-5">
            <h1 className="max-w-3xl text-balance font-sans text-5xl font-semibold leading-[1.02] tracking-[-0.045em] md:text-7xl">
              Research that argues <span className="text-primary">with itself.</span>
            </h1>
            <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
              Turn a complex business question into a citation-rich brief. Three specialized agents investigate, challenge, and judge every claim before it reaches you.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button render={<Link href="#workspace" />} nativeButton={false} size="lg" className="h-12 px-5 text-base">
              Get a prototype walkthrough <ArrowRight data-icon="inline-end" aria-hidden="true" />
            </Button>
            <Button render={<Link href="#research" />} nativeButton={false} variant="outline" size="lg" className="h-12 px-5 text-base">
              Read the research
            </Button>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            {['Evidence traced', 'Counterarguments included', 'Confidence calibrated'].map((item) => (
              <span key={item} className="flex items-center gap-1.5"><Check className="text-primary" aria-hidden="true" />{item}</span>
            ))}
          </div>
        </div>

        <div className="relative lg:pl-6" aria-label="Agentic research workflow preview">
          <div className="research-grid rounded-3xl border border-border bg-card p-4 shadow-2xl shadow-primary/5 sm:p-6">
            <div className="mb-5 flex items-center justify-between border-b border-border pb-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Live synthesis</p>
                <p className="mt-1 text-sm text-muted-foreground">Market entry: vertical AI for finance</p>
              </div>
              <span className="size-2 rounded-full bg-primary shadow-[0_0_16px_var(--primary)]" />
            </div>
            <div className="flex flex-col gap-3">
              <AgentRow icon={FileSearch} label="Researcher" status="12 sources mapped" detail="Signals support a wedge in recurring compliance workflows." />
              <AgentRow icon={Scale} label="Devil’s advocate" status="4 claims challenged" detail="Buyer urgency may be overstated outside regulated segments." />
              <AgentRow icon={ShieldCheck} label="Judge" status="Verdict forming" detail="Strong evidence, conditional on workflow ownership and data access." active />
            </div>
            <div className="mt-5 border-t border-border pt-5">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-mono uppercase tracking-wider text-muted-foreground">Synthesis confidence</span>
                <span className="font-mono text-primary">84%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-muted"><div className="h-full w-[84%] rounded-full bg-primary" /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AgentRow({ icon: Icon, label, status, detail, active = false }: { icon: typeof FileSearch; label: string; status: string; detail: string; active?: boolean }) {
  return (
    <div className={`rounded-2xl border p-4 ${active ? 'border-primary/40 bg-primary/5' : 'border-border bg-background/60'}`}>
      <div className="flex items-start gap-3">
        <span className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${active ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}><Icon aria-hidden="true" /></span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2"><p className="font-medium">{label}</p><p className="font-mono text-[11px] uppercase tracking-wider text-primary">{status}</p></div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{detail}</p>
        </div>
      </div>
    </div>
  )
}
