import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from '@/shared/ui/carousel'
import { useUnit } from 'effector-react'
import { $allResidentSets } from '../model'
import { ResidentSetCard } from './card'

export function CitiesCarousel() {
  const allSets = useUnit($allResidentSets)

  return (
    <Carousel className="w-full mt-[20px] px-[70px]" opts={{ align: 'start' }}>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselContent className="w-full mx-0 gap-[40px]">
        {allSets.map((residentSet) => (
          <ResidentSetCard key={residentSet.id} set={residentSet} />
        ))}
      </CarouselContent>
    </Carousel>
  )
}
