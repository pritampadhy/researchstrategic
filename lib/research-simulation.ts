export type ResearchClaim = {
  id: string
  title: string
  position: string
  evidence: string
  counterclaim: string
  challenge: string
  judgment: string
  confidence: number
  status: 'Supported' | 'Conditional' | 'Unresolved'
}

export type SimulatedResearchReport = {
  question: string
  topic: string
  generatedAt: string
  summary: string
  balancedView: string
  recommendation: string
  claims: ResearchClaim[]
}

const topicPatterns = [
  { pattern: /\b(ai|agent|automation|llm|artificial intelligence)\b/i, topic: 'AI adoption' },
  { pattern: /\b(saas|b2b|sales|lead|market|gtm|go-to-market)\b/i, topic: 'B2B go-to-market' },
  { pattern: /\b(product|prototype|feature|customer|user|workflow)\b/i, topic: 'Product strategy' },
]

const topicContext: Record<string, { opportunity: string; constraint: string; metric: string }> = {
  'AI adoption': {
    opportunity: 'task-level automation can improve speed and consistency when the workflow is bounded',
    constraint: 'quality depends on evaluation design, source traceability, and human review at consequential steps',
    metric: 'time-to-decision, correction rate, and evidence coverage',
  },
  'B2B go-to-market': {
    opportunity: 'a narrow ideal-customer profile can produce clearer messaging and faster learning loops',
    constraint: 'early demand signals may reflect founder-led reach rather than repeatable acquisition',
    metric: 'qualified conversion, sales-cycle length, and retained usage',
  },
  'Product strategy': {
    opportunity: 'a focused prototype can validate the highest-risk workflow before broader investment',
    constraint: 'stated interest is weaker evidence than repeated use in a real operating context',
    metric: 'activation, repeated task completion, and willingness to pay',
  },
  General: {
    opportunity: 'a structured test can replace broad assumptions with decision-relevant evidence',
    constraint: 'the conclusion may not generalize beyond the population and conditions tested',
    metric: 'decision confidence, observed outcomes, and counterevidence',
  },
}

export function simulateResearch(question: string): SimulatedResearchReport {
  const normalized = question.trim()
  const topic = topicPatterns.find(({ pattern }) => pattern.test(normalized))?.topic ?? 'General'
  const context = topicContext[topic]
  const subject = normalized.replace(/[?.!]+$/, '')
  const generatedAt = new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date())

  const claims: ResearchClaim[] = [
    {
      id: 'C-01',
      title: 'The opportunity is plausible',
      position: `For “${subject},” ${context.opportunity}.`,
      evidence: `Prototype evidence signal: adjacent workflows commonly improve when scope, inputs, and success criteria are explicit. Validate with ${context.metric}.`,
      counterclaim: 'The apparent opportunity may be an artifact of a small, unusually motivated early-user group.',
      challenge: 'Demand evidence should separate curiosity, trial behavior, repeated use, and paid commitment.',
      judgment: 'Proceed with a narrow pilot, but treat the opportunity as conditional until behavior is observed repeatedly.',
      confidence: 78,
      status: 'Conditional',
    },
    {
      id: 'C-02',
      title: 'A focused scope improves validity',
      position: 'Constraining the first use case reduces confounding variables and makes outcomes easier to interpret.',
      evidence: 'Prototype evidence signal: bounded tests produce cleaner before-and-after comparisons and clearer failure analysis.',
      counterclaim: 'A scope that is too narrow can overfit the solution and obscure adoption barriers in the wider workflow.',
      challenge: 'The test must preserve realistic handoffs, data quality, and user incentives even while limiting features.',
      judgment: 'Use one end-to-end workflow rather than one isolated feature, with explicit boundaries and expansion criteria.',
      confidence: 86,
      status: 'Supported',
    },
    {
      id: 'C-03',
      title: 'The main risk is evidence quality',
      position: `The decision can be improved by measuring ${context.metric} instead of relying on stated preference.`,
      evidence: 'Prototype evidence signal: observed behavior is generally more decision-relevant than survey enthusiasm alone.',
      counterclaim: context.constraint.charAt(0).toUpperCase() + context.constraint.slice(1) + '.',
      challenge: 'Metrics can still mislead when the baseline, comparison window, or selection criteria are poorly defined.',
      judgment: 'Pre-register the baseline, target cohort, observation window, and failure threshold before the pilot.',
      confidence: 91,
      status: 'Supported',
    },
    {
      id: 'C-04',
      title: 'Scaling should follow disconfirmation',
      position: 'The strongest investment case emerges after the team actively tests reasons the concept may fail.',
      evidence: 'Prototype evidence signal: explicit disconfirmation tests reduce confirmation bias and expose hidden operational costs.',
      counterclaim: 'Excessive validation can delay learning that only becomes possible at real scale.',
      challenge: 'Not every uncertainty needs resolution; only risks that would reverse or materially change the decision do.',
      judgment: 'Run the cheapest test for each decision-reversing assumption, then scale in stages with stop conditions.',
      confidence: 83,
      status: 'Conditional',
    },
  ]

  return {
    question: normalized,
    topic,
    generatedAt,
    summary: `This prototype frames the question as a ${topic.toLowerCase()} decision. The strongest case favors a bounded pilot with behavioral measures; the strongest objection is that early signals may not generalize to normal operating conditions.`,
    balancedView: `The concept is credible enough to test, but not yet strong enough to scale on narrative evidence alone. The balanced position is to preserve the real workflow, define disconfirming evidence in advance, and compare observed outcomes against a baseline.`,
    recommendation: `Run a limited pilot, measure ${context.metric}, and set a stop condition before collecting results. Advance only if the improvement persists across repeated use and the operational cost remains acceptable.`,
    claims,
  }
}
