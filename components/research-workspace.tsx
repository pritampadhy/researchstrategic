'use client'

import { useMemo, useRef, useState } from 'react'
import { ArrowRight, Check, Copy, Download, FileText, FlaskConical, Image as ImageIcon, Pencil, Printer, RotateCw, Scale } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { simulateResearch, type SimulatedResearchReport } from '@/lib/research-simulation'

const exampleQuestion = 'Should a mid-market B2B SaaS company use AI agents to automate first-pass customer research?'

export function ResearchWorkspace() {
  const [question, setQuestion] = useState('')
  const [error, setError] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [report, setReport] = useState<SimulatedResearchReport | null>(null)
  const [copied, setCopied] = useState(false)
  const reportRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const rankedClaims = useMemo(
    () => report ? [...report.claims].sort((a, b) => b.confidence - a.confidence) : [],
    [report],
  )

  function generateReport(value: string) {
    const cleanQuestion = value.trim()
    if (cleanQuestion.length < 12) {
      setError('Enter a specific research question of at least 12 characters.')
      inputRef.current?.focus()
      return
    }

    setError('')
    setIsGenerating(true)
    window.setTimeout(() => {
      setReport(simulateResearch(cleanQuestion))
      setIsGenerating(false)
      window.requestAnimationFrame(() => reportRef.current?.focus())
    }, 550)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    generateReport(question)
  }

  function editQuestion() {
    setReport(null)
    window.requestAnimationFrame(() => inputRef.current?.focus())
  }

  function reportText() {
    if (!report) return ''
    return [
      'SYNTHESIS/AI — PROTOTYPE RESEARCH REPORT',
      `Question: ${report.question}`,
      `Topic: ${report.topic}`,
      `Generated: ${report.generatedAt}`,
      '',
      'EXECUTIVE OVERVIEW',
      report.summary,
      '',
      'BALANCED VIEW',
      report.balancedView,
      '',
      'RECOMMENDED NEXT STEP',
      report.recommendation,
      '',
      'RANKED CLAIMS',
      ...rankedClaims.map((claim, index) => `${index + 1}. ${claim.title} (${claim.confidence}% confidence) — ${claim.judgment}`),
      '',
      'Prototype simulation only. No external sources queried.',
    ].join('\\n')
  }

  function downloadText() {
    const blob = new Blob([reportText()], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'synthesis-research-report.txt'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  async function copyForSocial() {
    if (!report) return
    const text = `${report.question}\\n\\n${report.balancedView}\\n\\nKey takeaway: ${report.recommendation}\\n\\n#Research #B2BSaaS #ProductStrategy`
    await navigator.clipboard.writeText(text)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1800)
  }

  function downloadSocialImage() {
    if (!report) return
    const escapeXml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;')
    const headline = report.question.length > 84 ? `${report.question.slice(0, 84)}…` : report.question
    const takeaway = report.recommendation.length > 190 ? `${report.recommendation.slice(0, 190)}…` : report.recommendation
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#10231b"/><rect x="58" y="58" width="1084" height="514" rx="28" fill="#17372a" stroke="#69d69a" stroke-opacity=".35"/><text x="100" y="135" fill="#8ee6af" font-family="Arial" font-size="22" font-weight="700" letter-spacing="4">SYNTHESIS/AI · BALANCED VIEW</text><text x="100" y="215" fill="#f2f7f3" font-family="Arial" font-size="38" font-weight="700">${escapeXml(headline)}</text><foreignObject x="100" y="270" width="940" height="170"><div xmlns="http://www.w3.org/1999/xhtml" style="font: 26px Arial; line-height:1.45; color:#d5e9dc">${escapeXml(takeaway)}</div></foreignObject><text x="100" y="520" fill="#8ee6af" font-family="Arial" font-size="20">Prototype report · ${escapeXml(report.generatedAt)}</text></svg>`
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'synthesis-social-card.svg'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section id="workspace" className="relative overflow-hidden border-b border-primary/20 bg-primary/[0.035] py-12 lg:py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div className="flex flex-col gap-4">
            <Badge variant="outline" className="border-primary/30 text-primary">Interactive prototype</Badge>
            <h2 className="max-w-xl text-balance text-3xl font-semibold tracking-tight md:text-5xl">
              Put a research question under pressure.
            </h2>
          </div>
          <p className="max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground lg:justify-self-end">
            See how the Researcher, Devil&apos;s Advocate, and Judge structure competing claims. This is a deterministic prototype simulation—not live web research.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
          <span className="py-2 font-mono text-xs uppercase tracking-[0.14em] text-primary">Start here</span>
          {[exampleQuestion, 'Will AI research tools reduce time-to-insight for product teams?', 'Is founder-led sales repeatable for this B2B SaaS prototype?'].map((prompt) => (
            <Button key={prompt} type="button" variant="outline" size="sm" onClick={() => { setQuestion(prompt); setError(''); inputRef.current?.focus() }}>
              {prompt.length > 54 ? `${prompt.slice(0, 54)}…` : prompt}
            </Button>
          ))}
        </div>

        <Card className="overflow-hidden border-primary/30 bg-card/80 shadow-[0_16px_60px_-24px_hsl(var(--primary)/0.5)]">
          <CardHeader className="border-b border-border bg-muted/20">
            <CardTitle className="flex items-center gap-2 text-xl">
              <FlaskConical className="size-5 text-primary" aria-hidden="true" />
              Research question
            </CardTitle>
            <CardDescription>Ask one focused question with a decision, audience, or constraint.</CardDescription>
          </CardHeader>
          <CardContent className="p-5 md:p-7">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 no-print">
              <Field data-invalid={Boolean(error)}>
                <FieldLabel htmlFor="research-question">What do you want to investigate?</FieldLabel>
                <Textarea
                  ref={inputRef}
                  id="research-question"
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  aria-invalid={Boolean(error)}
                  aria-describedby="research-question-help"
                  placeholder="Example: Should we launch this prototype to mid-market research teams?"
                  className="min-h-32 resize-y bg-background/60 p-4 text-base leading-relaxed"
                />
                <FieldDescription id="research-question-help">The simulation adapts to AI, B2B go-to-market, and product strategy topics.</FieldDescription>
                {error ? <FieldError>{error}</FieldError> : null}
              </Field>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button type="button" variant="ghost" onClick={() => { setQuestion(exampleQuestion); setError('') }}>
                  Use example question
                </Button>
                <Button type="submit" size="lg" disabled={isGenerating}>
                  {isGenerating ? <RotateCw data-icon="inline-start" className="animate-spin" aria-hidden="true" /> : <ArrowRight data-icon="inline-start" aria-hidden="true" />}
                  {isGenerating ? 'Structuring arguments…' : 'Generate prototype report'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {report ? (
          <div ref={reportRef} tabIndex={-1} aria-live="polite" className="flex scroll-mt-24 flex-col gap-6 outline-none">
            <div className="no-print flex flex-col gap-4 rounded-xl border border-primary/25 bg-primary/5 p-5 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>Prototype report</Badge>
                  <Badge variant="outline">{report.topic}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Generated {report.generatedAt} · simulated analysis · no external sources queried</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" onClick={editQuestion}><Pencil data-icon="inline-start" aria-hidden="true" />Edit question</Button>
                <Button variant="outline" onClick={() => generateReport(question)}><RotateCw data-icon="inline-start" aria-hidden="true" />Run again</Button>
                <Button onClick={() => window.print()}><Printer data-icon="inline-start" aria-hidden="true" />PDF</Button>
                <Button variant="outline" onClick={downloadText}><Download data-icon="inline-start" aria-hidden="true" />Text</Button>
                <Button variant="outline" onClick={downloadSocialImage}><ImageIcon data-icon="inline-start" aria-hidden="true" />Social image</Button>
              </div>
            </div>

            <div className="no-print rounded-xl border border-border bg-card p-4 md:p-6">
              <Tabs defaultValue="overview">
                <div className="overflow-x-auto pb-2">
                  <TabsList variant="line" className="min-w-max">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="research">Research claims</TabsTrigger>
                    <TabsTrigger value="devils-advocate">Devil&apos;s advocate</TabsTrigger>
                    <TabsTrigger value="ranking">Balanced ranking</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="overview" className="pt-5">
                  <div className="grid gap-4 lg:grid-cols-3">
                    <ReportNote icon={FileText} title="Research summary" text={report.summary} />
                    <ReportNote icon={Scale} title="Balanced view" text={report.balancedView} />
                    <ReportNote icon={ArrowRight} title="Recommended next step" text={report.recommendation} />
                  </div>
                </TabsContent>

                <TabsContent value="research" className="pt-5">
                  <ResearchClaimsTable report={report} />
                </TabsContent>

                <TabsContent value="devils-advocate" className="pt-5">
                  <DevilsAdvocateTable report={report} />
                </TabsContent>

                <TabsContent value="ranking" className="pt-5">
                  <BalancedRankingTable claims={rankedClaims} />
                </TabsContent>
              </Tabs>
            </div>

            <Card className="no-print border-primary/20 bg-muted/20">
              <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-base"><ImageIcon className="size-4 text-primary" aria-hidden="true" />Post-ready takeaway</CardTitle>
                  <CardDescription>Copy the short version or download a visual card for social publishing.</CardDescription>
                </div>
                <Button variant="outline" onClick={copyForSocial}>{copied ? <Check data-icon="inline-start" aria-hidden="true" /> : <Copy data-icon="inline-start" aria-hidden="true" />}{copied ? 'Copied' : 'Copy social text'}</Button>
              </CardHeader>
              <CardContent><p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">{report.balancedView} <span className="font-medium text-foreground">Key takeaway:</span> {report.recommendation}</p></CardContent>
            </Card>

            <article className="print-report hidden" aria-label="Printable prototype research report">
              <header>
                <p className="print-kicker">Synthesis/AI · Prototype simulation</p>
                <h1>Research report</h1>
                <p className="print-question">{report.question}</p>
                <p>Generated {report.generatedAt} · Topic: {report.topic} · No external sources queried</p>
              </header>
              <section>
                <h2>Executive overview</h2>
                <h3>Research summary</h3><p>{report.summary}</p>
                <h3>Balanced view</h3><p>{report.balancedView}</p>
                <h3>Recommended next step</h3><p>{report.recommendation}</p>
              </section>
              <section><h2>Research claims</h2><ResearchClaimsTable report={report} /></section>
              <section><h2>Devil&apos;s advocate</h2><DevilsAdvocateTable report={report} /></section>
              <section><h2>Balanced ranking</h2><BalancedRankingTable claims={rankedClaims} /></section>
              <footer>This report is a deterministic product simulation and is not a substitute for sourced research.</footer>
            </article>
          </div>
        ) : null}
      </div>
    </section>
  )
}

function ReportNote({ icon: Icon, title, text }: { icon: typeof FileText; title: string; text: string }) {
  return (
    <Card className="bg-muted/20">
      <CardHeader>
        <Icon className="size-5 text-primary" aria-hidden="true" />
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent><p className="text-sm leading-relaxed text-muted-foreground">{text}</p></CardContent>
    </Card>
  )
}

function ResearchClaimsTable({ report }: { report: SimulatedResearchReport }) {
  return (
    <Table className="min-w-3xl">
      <TableHeader><TableRow><TableHead className="w-24">Claim</TableHead><TableHead>Researcher position</TableHead><TableHead>Evidence text</TableHead><TableHead>Confidence</TableHead></TableRow></TableHeader>
      <TableBody>{report.claims.map((claim) => <TableRow key={claim.id}><TableCell className="font-mono text-primary">{claim.id}</TableCell><TableCell className="max-w-sm whitespace-normal align-top font-medium leading-relaxed">{claim.position}</TableCell><TableCell className="max-w-sm whitespace-normal align-top leading-relaxed text-muted-foreground">{claim.evidence}</TableCell><TableCell className="align-top font-mono">{claim.confidence}%</TableCell></TableRow>)}</TableBody>
    </Table>
  )
}

function DevilsAdvocateTable({ report }: { report: SimulatedResearchReport }) {
  return (
    <Table className="min-w-3xl">
      <TableHeader><TableRow><TableHead className="w-24">Claim</TableHead><TableHead>Counterclaim</TableHead><TableHead>Challenge text</TableHead></TableRow></TableHeader>
      <TableBody>{report.claims.map((claim) => <TableRow key={claim.id}><TableCell className="font-mono text-accent">{claim.id}</TableCell><TableCell className="max-w-md whitespace-normal align-top font-medium leading-relaxed">{claim.counterclaim}</TableCell><TableCell className="max-w-md whitespace-normal align-top leading-relaxed text-muted-foreground">{claim.challenge}</TableCell></TableRow>)}</TableBody>
    </Table>
  )
}

function BalancedRankingTable({ claims }: { claims: SimulatedResearchReport['claims'] }) {
  return (
    <Table className="min-w-5xl">
      <TableHeader><TableRow><TableHead>Rank</TableHead><TableHead>Contested claim</TableHead><TableHead>Researcher</TableHead><TableHead>Devil&apos;s advocate</TableHead><TableHead>Balanced judgment</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
      <TableBody>{claims.map((claim, index) => <TableRow key={claim.id}><TableCell className="align-top font-mono text-lg">#{index + 1}</TableCell><TableCell className="max-w-48 whitespace-normal align-top font-medium leading-relaxed">{claim.title}<span className="mt-1 block font-mono text-xs text-muted-foreground">{claim.confidence}% confidence</span></TableCell><TableCell className="max-w-xs whitespace-normal align-top leading-relaxed">{claim.position}</TableCell><TableCell className="max-w-xs whitespace-normal align-top leading-relaxed text-muted-foreground">{claim.counterclaim}</TableCell><TableCell className="max-w-xs whitespace-normal align-top leading-relaxed">{claim.judgment}</TableCell><TableCell className="align-top"><Badge variant={claim.status === 'Supported' ? 'default' : 'outline'}>{claim.status}</Badge></TableCell></TableRow>)}</TableBody>
    </Table>
  )
}
