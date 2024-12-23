import { ArrowIcon } from '@/shared/icons'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion'
import { CitiesCarousel } from './carousel'
import { useUnit } from 'effector-react'
import { ResidentSetCard } from './card'
import { Link } from 'atomic-router-react'
import { editSetRoute } from '@/shared/routes'
import { $residentSetSearch, $searhcResultResidentSets, residentSetSearchChanged, residentSetSearched } from '../model'

export function ResidentSetsDashboard() {
  const search = useUnit($residentSetSearch)
  const searchChange = useUnit(residentSetSearchChanged)
  const searchResults = useUnit($searhcResultResidentSets)
  const onSearch = useUnit(residentSetSearched)

  return (
    <section className="w-full rounded-xl bg-grey p-[20px] flex flex-col">
      <Accordion type="single" collapsible>
        <AccordionItem value="carousel" className="border-b-0">
          <AccordionTrigger className="flex hover:no-underline justify-start items-center gap-[20px] pl-[70px]">
            <p className="underline text-xl">НАБОРЫ КАРТ ЖИТЕЛЕЙ</p>
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
          to={editSetRoute}
          params={{ id: 'new' }}
          className="text-white text-xl min-w-max bg-green rounded-lg px-[10px] py-[5px]"
        >
          + ДОБАВИТЬ НАБОР
        </Link>
      </div>
      <div className="mt-[50px] px-[70px] w-full flex flex-col gap-[20px]">
        <p className="underline text-xl">РЕЗУЛЬТАТЫ ПОИСКА</p>
        <div className="w-full flex gap-x-[40px] gap-y-[20px] flex-wrap">
          {searchResults.map((residentSet) => (
            <ResidentSetCard key={residentSet.id} set={residentSet} />
          ))}
        </div>
      </div>
    </section>
  )
}
