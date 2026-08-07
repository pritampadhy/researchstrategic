import Link from 'next/link'
import { Orbit } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <div className="flex items-center gap-2 text-foreground"><Orbit aria-hidden="true" /><span className="font-semibold">Synthesis/AI</span></div>
        <p>Evidence before confidence.</p>
        <div className="flex gap-5"><Link href="#research" className="hover:text-foreground">Research</Link><Link href="#access" className="hover:text-foreground">Contact</Link></div>
      </div>
    </footer>
  )
}
