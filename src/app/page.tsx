import { Hero } from '@/components/sections/Hero'
import { QuickChoice } from '@/components/sections/QuickChoice'
import { WhyTrustUs } from '@/components/sections/WhyTrustUs'
import { FeaturedPathways } from '@/components/sections/FeaturedPathways'
import { PremiumMap } from '@/components/sections/PremiumMap'
import { BookExperiences } from '@/components/sections/BookExperiences'
import { SocialProof } from '@/components/sections/SocialProof'
import { SupportUs } from '@/components/sections/SupportUs'
import { Partners } from '@/components/sections/Partners'
import { Footer } from '@/components/sections/Footer'
import { StickyMobileCTA } from '@/components/ui/StickyMobileCTA'
import { ScrollDepthTracker } from '@/components/ui/ScrollDepthTracker'

export default function HomePage() {
  return (
    <main className="relative">
      <ScrollDepthTracker />
      <Hero />
      <QuickChoice />
      <WhyTrustUs />
      <FeaturedPathways />
      <PremiumMap />
      <BookExperiences />
      <SocialProof />
      <SupportUs />
      <Partners />
      <Footer />
      <StickyMobileCTA />
    </main>
  )
}
