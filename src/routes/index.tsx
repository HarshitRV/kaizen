import { createFileRoute } from '@tanstack/react-router'
import { MainContent } from '#/components/container/main-content/main-content'
import { DateForm } from '#/components/date-form/date-form'
import { seo } from '#/utils/seo'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: seo({
      title: 'Kaizen — Your Time is Now',
      description:
        'The best time to plant a tree was years ago. The second best is right now. See how much of your life you still have — and make it count.',
    }),
  }),
  component: Home,
})

function Home() {
  return (
    <MainContent>
      <p className="text-lg sm:text-xl md:text-2xl mb-4">Your Time</p>
      <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center leading-snug">
        The best time to <br /> plant a tree was <br />
        <span className="text-primary">years ago</span>.
        <br />
        The second best is <br />
        <span className="text-chart-2">right now</span>
      </h1>
      <p className="text-sm sm:text-base md:text-lg text-center mt-4">
        You still have time. But the clock doesn't pause <br />
        while you think about it.
      </p>

      <DateForm />
    </MainContent>
  )
}
