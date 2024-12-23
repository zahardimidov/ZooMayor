import { Link } from 'atomic-router-react'
import { Card } from '../model'
import { editCardRoute } from '@/shared/routes'

export function ResidentCard({ card }: { card: Card }) {
  return (
    <div className="min-w-[300px] w-[300px] flex flex-col gap-[10px]">
      <div
        className="w-full aspect-[2/3] bg-cover bg-center bg-no-repeat rounded-lg"
        style={{ backgroundImage: `url(${card.photo})` }}
      ></div>
      <div className="w-full bg-green rounded-lg flex flex-col overflow-hidden">
        <div className="w-full bg-white rounded-lg gap-[5px] flex flex-col p-[5px] items-center text-center">
          <p className="underline text-lg pb-[15px]">{card.title}</p>
          <p className="text-sm">Единоразовый бонус:</p>
          <p>{card.bonus}</p>
          <p className="text-sm">Доход в час:</p>
          <p>{card.bonus_per_hour}</p>
          <p className="text-sm">Опыт:</p>
          <p>{card.exp}</p>
        </div>
        <Link
          to={editCardRoute}
          params={{ id: card.id.toString() }}
          className="text-white text-center w-full text-lg cursor-pointer"
        >
          РЕДАКТИРОВАТЬ
        </Link>
      </div>
    </div>
  )
}
