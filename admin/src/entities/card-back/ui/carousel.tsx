import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from '@/shared/ui/carousel'
import { useEffect, useState } from 'react'
import { CardBack } from '../model'
import { CardBackCard } from './card'

export function CardBackCarousel() {
  const [allCards, setCardBacksResults] = useState<CardBack[]>([]);

  useEffect(() => {
    fetch(`http://0.0.0.0:4550/admin/cardbacks`, {
      method: 'GET',
    }).then(response => response.json())
      .then(data => {
        setCardBacksResults(data.cardbacks);
      });
  }, [])

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
