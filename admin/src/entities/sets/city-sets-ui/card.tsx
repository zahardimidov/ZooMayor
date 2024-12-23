import { Link } from 'atomic-router-react'
import { Set } from '../model'
import { editSetRoute } from '@/shared/routes'

export function CitySetCard({ set }: { set: Set }) {
  return (
    <div className="min-w-[300px] w-[300px] flex flex-col gap-[10px]">
      <div
        className="w-full aspect-[2/3] bg-cover bg-center bg-no-repeat rounded-lg"
        style={{ backgroundImage: `url(${set.photo})` }}
      ></div>
      <div className="w-full bg-green rounded-lg flex flex-col overflow-hidden">
        <div className="w-full bg-white rounded-lg gap-[5px] flex flex-col p-[5px] items-center text-center">
          <p className="underline text-lg pb-[15px]">{set.name}</p>
          <p className="text-sm">Единоразовый бонус:</p>
          <p>{set.bonus}</p>
          <p className="text-sm">Доход в час:</p>
          <p>{set.hourlyIncome}</p>
          <p className="text-sm">Опыт:</p>
          <p>{set.experience}</p>
        </div>
        <Link
          to={editSetRoute}
          params={{ id: set.id.toString() }}
          className="text-white text-center w-full text-lg cursor-pointer"
        >
          РЕДАКТИРОВАТЬ
        </Link>
      </div>
    </div>
  )
}
