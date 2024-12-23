import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from '@/shared/ui/carousel';
import { useEffect, useState } from 'react';
import { Card } from '../model';
import { CityCard } from './card';

export function CitiesCarousel() {
  const [allCards, setCardsResults] = useState<Card[]>([]);

  useEffect(() => {
    fetch(`http://0.0.0.0:4550/admin/cards/cities`, {
      method: 'GET',
    }).then(response => response.json())
      .then(data => {
        setCardsResults(data.cards);
      });
  }, [])

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
