'use server'

import { db } from '@/lib/db'
import { leads } from '@/lib/db/schema'

export type LeadState = {
  status: 'idle' | 'success' | 'error'
  message: string
}

export async function submitLead(
  _previousState: LeadState,
  formData: FormData,
): Promise<LeadState> {
  const name = String(formData.get('name') ?? '').trim().slice(0, 100)
  const email = String(formData.get('email') ?? '').trim().toLowerCase().slice(0, 254)
  const company = String(formData.get('company') ?? '').trim().slice(0, 120)
  const role = String(formData.get('role') ?? '').trim().slice(0, 120)
  const useCase = String(formData.get('useCase') ?? '').trim().slice(0, 1000)

  if (!name || !company || !email || !/^\S+@\S+\.\S+$/.test(email)) {
    return { status: 'error', message: 'Please complete your name, work email, and company.' }
  }

  try {
    await db
      .insert(leads)
      .values({ name, email, company, role: role || null, useCase: useCase || null })
      .onConflictDoUpdate({
        target: leads.email,
        set: { name, company, role: role || null, useCase: useCase || null, status: 'new' },
      })

    return {
      status: 'success',
      message: 'You’re on the list. We’ll send a tailored prototype walkthrough shortly.',
    }
  } catch {
    return { status: 'error', message: 'We couldn’t save your request. Please try again.' }
  }
}
