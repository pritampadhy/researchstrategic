import Link from 'next/link'
import { ArrowUpRight, Orbit } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="#top" className="flex items-center gap-2 font-semibold tracking-tight" aria-label="Synthesis home">
          <span className="flex size-8 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
            <Orbit aria-hidden="true" />
          </span>
          <span>Synthesis<span className="text-primary">/</span>AI</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex" aria-label="Primary navigation">
          <Link href="#method" className="transition-colors hover:text-foreground">Method</Link>
          <Link href="#research" className="transition-colors hover:text-foreground">Research</Link>
          <Link href="#principles" className="transition-colors hover:text-foreground">Principles</Link>
        </nav>
        <Button render={<Link href="#access" />} nativeButton={false} size="lg">
          Request access <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
        </Button>
      </div>
    </header>
  )
}
