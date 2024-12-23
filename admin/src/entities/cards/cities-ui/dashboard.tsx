import { ArrowIcon } from '@/shared/icons'
import { editCardRoute } from '@/shared/routes'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion'
import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'
import { $citySearch, Card, citySearchChanged, citySearched } from '../model'
import { CityCard } from './card'
import { CitiesCarousel } from './carousel'

export function CitiesDashboard() {
  const search = useUnit($citySearch)
  const searchChange = useUnit(citySearchChanged)
  const onSearch = useUnit(citySearched)

  const [searchResults, setSearchResults] = useState<Card[]>([]);

  useEffect(() => {
    fetch(`http://0.0.0.0:4550/admin/cards/cities`, {
      method: 'GET',
    }).then(response => response.json())
      .then(data => {
        setSearchResults(data.cards);
      });
  }, [])

  return (
    <section className="w-full rounded-xl bg-grey p-[20px] flex flex-col">
      <Accordion type="single" collapsible>
        <AccordionItem value="carousel" className="border-b-0">
          <AccordionTrigger className="flex hover:no-underline justify-start items-center gap-[20px] pl-[70px]">
            <p className="underline text-xl">КАРТЫ ГОРОДОВ</p>
            <div className="size-[30px] flex items-center justify-center">
              <ArrowIcon />
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <CitiesCarousel />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="w-full mt-[50px] px-[70px] flex justify-between gap-[40px]">
        <div className="flex w-full shadow-inner shadow-black rounded-lg bg-white">
          <button className="text-white text-lg bg-green rounded-lg px-[10px] py-[5px]">ФИЛЬТР</button>
          <input
            type="text"
            className="w-full outline-none bg-transparent placeholder:underline px-[20px] placeholder:text-black/70 flex items-center justify-center"
            placeholder="Введите название"
            value={search}
            onChange={(e) => searchChange(e.target.value)}
          />
          <button className="text-white text-lg bg-green rounded-lg px-[10px] py-[5px]" onClick={onSearch}>
            ПОИСК
          </button>
        </div>
        <Link
          to={editCardRoute}
          params={{ id: 'new' }}
          className="text-white text-xl min-w-max bg-green rounded-lg px-[10px] py-[5px]"
        >
          + ДОБАВИТЬ КАРТУ
        </Link>
      </div>
      <div className="mt-[50px] px-[70px] w-full flex flex-col gap-[20px]">
        <p className="underline text-xl">РЕЗУЛЬТАТЫ ПОИСКА</p>
        <div className="w-full flex gap-x-[40px] gap-y-[20px] flex-wrap">
          {searchResults.map((city) => (
            <CityCard key={city.id} card={city} />
          ))}
        </div>
      </div>
    </section>
  )
}
