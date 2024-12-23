import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from '@/shared/ui/carousel'
import { useUnit } from 'effector-react'
import { $allCitySets } from '../model'
import { CitySetCard } from './card'

export function CitiesCarousel() {
  const allSets = useUnit($allCitySets)

  return (
    <Carousel className="w-full mt-[20px] px-[70px]" opts={{ align: 'start' }}>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselContent className="w-full mx-0 gap-[40px]">
        {allSets.map((citySet) => (
          <CitySetCard key={citySet.id} set={citySet} />
        ))}
      </CarouselContent>
    </Carousel>
  )
}
