import { editSetRoute } from '@/shared/routes'
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from '@/shared/ui/carousel'
import { Link } from 'atomic-router-react'

interface Set {
  name: string
  length: number
  creator: string
  date: string
  reward: string
  lasts: string
  note: string
  status: boolean
  collected: number
  lateStartDate: string
}

export function SetCard({ set }: { set: Set }) {
  return (
    <div className="w-full bg-white rounded-lg p-[20px]">
      <div className="w-full grid grid-cols-3 gap-[20px]">
        <div className="w-full flex flex-col justify-between">
          <div>
            <p className="text-xs text-black/50">название сета карт</p>
            <p className="text-lg">{set.name}</p>
          </div>
          <div className="w-full grid grid-cols-2 gap-[10px]">
            <div className="w-full flex flex-col gap-[5px] items-center">
              <Carousel className="w-full">
                <CarouselContent className="mx-0 gap-[10px]">
                  {Array(set.length)
                    .fill(null)
                    .map((_, index) => (
                      <div className="bg-grey rounded-lg min-w-[60px] w-[60px] aspect-[1/1.6]" key={index}></div>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <p className="text-xs text-black/50">{set.length} карты в сете</p>
            </div>
            <div className="w-full">
              <p className="text-lg">Koлличество собранных сетов:</p>
              <p className="text-lg text-green -mt-[10px]">{set.collected}</p>
              <p className="text-xs text-black/50">собрано пользователями</p>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col justify-start">
          <p>Краткое описание бонусной программы</p>
          <div className="border border-black text-xs text-black/50 rounded-lg p-[10px] flex flex-col gap-[5px]">
            <p>Кем создано: {set.creator}</p>
            <p>Дата создания: {set.date}</p>
            <p>Дата и время отложенного старта: {set.lateStartDate}</p>
            <p>Вознаграждение: {set.reward}</p>
            <p>Время до завершения: {set.lasts}</p>
          </div>
        </div>
        <div className="w-full flex flex-col justify-start">
          <p>Пометки для администратора</p>
          <div className="border border-black h-full text-xs text-black/50 rounded-lg p-[10px] flex flex-col gap-[5px]">
            {set.note}
          </div>
        </div>
      </div>
      <div className="w-full mt-[20px] grid grid-cols-2 gap-[20px]">
        <div className="flex gap-[10px]">
          <Link
            to={editSetRoute}
            params={{ id: '0' }}
            className="bg-green rounded-lg px-[10px] py-[7px] text-xl text-white underline"
          >
            РЕДАКТИРОВАТЬ
          </Link>
          <button className="bg-red rounded-lg px-[10px] py-[7px] text-xl text-white underline">ОСТАНОВИТЬ</button>
          <button className="bg-red rounded-lg px-[10px] py-[7px] text-xl text-white underline">УДАЛИТЬ</button>
        </div>
        <p className="text-xl">
          СТАТУС РАБОТЫ:{' '}
          <span className={set.status ? 'text-green' : 'text-red'}>{set.status ? 'АКТИВИРОВАН' : 'НЕ АКТИВИРОВАН'}</span>
        </p>
      </div>
    </div>
  )
}
