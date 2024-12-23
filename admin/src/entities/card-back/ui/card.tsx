import { Link } from 'atomic-router-react'
import { CardBack } from '../model'
import { editCardBackRoute } from '@/shared/routes'

export function CardBackCard({ card }: { card: CardBack }) {
  return (
    <div className="min-w-[300px] w-[300px] flex flex-col gap-[10px]">
      <div
        className="w-full aspect-[2/3] bg-cover bg-center bg-no-repeat rounded-lg"
        style={{ backgroundImage: `url(${card.photo})` }}
      ></div>
      <div className="w-full bg-green rounded-lg flex flex-col overflow-hidden">
        <div className="w-full bg-white rounded-lg gap-[5px] flex flex-col p-[5px] items-center text-center">
          <p className="underline text-lg pb-[15px]">{card.name}</p>
          <p className="text-sm">Стоимость покупки:</p>
          <p>{card.price}</p>
          <p className="text-sm">Получение по коду:</p>
          <p>{card.codePurchase ? 'ДА' : '-'}</p>
          <p className="text-sm">Получение по задания:</p>
          <p>{card.taskPurchase ? 'ДА' : '-'}</p>
        </div>
        <Link
          to={editCardBackRoute}
          params={{ id: card.id.toString() }}
          className="text-white text-center w-full text-lg cursor-pointer"
        >
          РЕДАКТИРОВАТЬ
        </Link>
      </div>
    </div>
  )
}
