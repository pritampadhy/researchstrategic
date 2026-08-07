import { AccessSection } from '@/components/access-section'
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
        <HeroSection />
        <MethodSection />
        <ResearchWorkspace />
        <ResearchSection />
        <PrinciplesSection />
        <AccessSection />
      </main>
      <SiteFooter />
    </>
  )
}
