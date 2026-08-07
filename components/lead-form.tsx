'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { ArrowRight, LoaderCircle } from 'lucide-react'
import { submitLead, type LeadState } from '@/app/actions/leads'
import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const initialState: LeadState = { status: 'idle', message: '' }

export function LeadForm() {
  const [state, formAction] = useActionState(submitLead, initialState)

  return (
    <form action={formAction} className="rounded-3xl border border-border bg-card p-5 shadow-2xl shadow-primary/5 sm:p-7">
      <FieldGroup>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="name">Your name</FieldLabel>
            <Input id="name" name="name" autoComplete="name" placeholder="Alex Morgan" required />
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Work email</FieldLabel>
            <Input id="email" name="email" type="email" autoComplete="email" placeholder="alex@company.com" required />
          </Field>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="company">Company</FieldLabel>
            <Input id="company" name="company" autoComplete="organization" placeholder="Acme Inc." required />
          </Field>
          <Field>
            <FieldLabel htmlFor="role">Role</FieldLabel>
            <Input id="role" name="role" autoComplete="organization-title" placeholder="Founder, Strategy, Research…" />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="useCase">What do you need to research?</FieldLabel>
          <Textarea id="useCase" name="useCase" placeholder="Tell us about the decision, market, or thesis you’re investigating." rows={4} />
          <FieldDescription>We’ll tailor the walkthrough to your use case.</FieldDescription>
        </Field>
        {state.message && (
          <p role="status" className={`rounded-xl border p-3 text-sm ${state.status === 'success' ? 'border-primary/30 bg-primary/5 text-primary' : 'border-destructive/30 bg-destructive/5 text-destructive'}`}>
            {state.message}
          </p>
        )}
        <SubmitButton />
        <p className="text-center text-xs leading-relaxed text-muted-foreground">By requesting access, you agree to receive product updates. No spam, ever.</p>
      </FieldGroup>
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" size="lg" className="h-12 w-full text-base" disabled={pending}>
      {pending ? <LoaderCircle data-icon="inline-start" className="animate-spin" aria-hidden="true" /> : null}
      {pending ? 'Saving your request…' : 'Request early access'}
      {!pending ? <ArrowRight data-icon="inline-end" aria-hidden="true" /> : null}
    </Button>
  )
}
