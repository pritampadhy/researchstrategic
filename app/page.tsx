import { HeroSection } from '@/components/hero-section'
import { MethodSection } from '@/components/method-section'
import { PrinciplesSection } from '@/components/principles-section'
import { ResearchSection } from '@/components/research-section'
import { ResearchWorkspace } from '@/components/research-workspace'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <ResearchWorkspace />
        <HeroSection />
        <MethodSection />
        <ResearchSection />
        <PrinciplesSection />
      </main>
      <SiteFooter />
    </>
  )
}
