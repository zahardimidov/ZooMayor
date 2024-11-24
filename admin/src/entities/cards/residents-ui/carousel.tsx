import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from '@/shared/ui/carousel'
import { useUnit } from 'effector-react'
import { $allResidents } from '../model'
import { ResidentCard } from './card'

export function ResidentsCarousel() {
  const allCards = useUnit($allResidents)

  return (
    <Carousel className="w-full mt-[20px] px-[70px]" opts={{ align: 'start' }}>
      <CarouselContent className="w-full mx-0 gap-[40px]">
        {allCards.map((resident) => (
          <ResidentCard key={resident.id} card={resident} />
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
