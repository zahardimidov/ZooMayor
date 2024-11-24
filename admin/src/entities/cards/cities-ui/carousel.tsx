import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from '@/shared/ui/carousel'
import { useUnit } from 'effector-react'
import { $allCities } from '../model'
import { CityCard } from './card'

export function CitiesCarousel() {
  const allCards = useUnit($allCities)

  return (
    <Carousel className="w-full mt-[20px] px-[70px]" opts={{ align: 'start' }}>
      <CarouselContent className="w-full mx-0 gap-[40px]">
        {allCards.map((city) => (
          <CityCard key={city.id} card={city} />
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
