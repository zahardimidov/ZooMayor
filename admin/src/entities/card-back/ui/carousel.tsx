import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from '@/shared/ui/carousel'
import { useUnit } from 'effector-react'
import { $allCardBacks } from '../model'
import { CardBackCard } from './card'

export function CardBackCarousel() {
  const allCards = useUnit($allCardBacks)

  return (
    <Carousel className="w-full mt-[20px] px-[70px]" opts={{ align: 'start' }}>
      <CarouselContent className="w-full mx-0 gap-[40px]">
        {allCards.map((cardBack) => (
          <CardBackCard key={cardBack.id} card={cardBack} />
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
