import { bigint, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const leads = pgTable('leads', {
  id: bigint('id', { mode: 'number' }).primaryKey().generatedAlwaysAsIdentity(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  company: text('company').notNull(),
  role: text('role'),
  teamSize: text('team_size'),
  useCase: text('use_case'),
  status: text('status').notNull().default('new'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})
