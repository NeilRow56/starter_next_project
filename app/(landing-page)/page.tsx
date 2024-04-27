import Hero from '@/components/dashboard-layout/Hero'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function LandingPage() {
  return (
    <section className="flex  items-center justify-center bg-background">
      <Hero />
    </section>
  )
}
