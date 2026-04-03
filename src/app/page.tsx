import { Hero } from '@/components/sections/Hero'
import { WhyTrustUs } from '@/components/sections/WhyTrustUs'
import { FeaturedPathways } from '@/components/sections/FeaturedPathways'
import { LeaveAReview } from '@/components/sections/LeaveAReview'
import { RecommendationsList } from '@/components/sections/RecommendationsList'
import { Recommendations } from '@/components/sections/Recommendations'
import { PremiumMap } from '@/components/sections/PremiumMap'
import { BookExperiences } from '@/components/sections/BookExperiences'
import { SocialProof } from '@/components/sections/SocialProof'
import { SupportUs } from '@/components/sections/SupportUs'
import { AdvertiseWithUs } from '@/components/sections/AdvertiseWithUs'
import { Footer } from '@/components/sections/Footer'
import { StickyMobileCTA } from '@/components/ui/StickyMobileCTA'
import { ScrollDepthTracker } from '@/components/ui/ScrollDepthTracker'
import { ReviewPopup } from '@/components/ui/ReviewPopup'

export const dynamic = 'force-dynamic'

export default function HomePage() {
  return (
    <main className="relative">
      <ScrollDepthTracker />
      <Hero />
      <RecommendationsList />
      <WhyTrustUs />
      <LeaveAReview />
      <FeaturedPathways />
      <Recommendations />
      <PremiumMap />
      <BookExperiences />
      <SocialProof />
      <SupportUs />
      <AdvertiseWithUs />
      <Footer />
      <StickyMobileCTA />
      <ReviewPopup />
    </main>
  )
}
