import { Link } from 'atomic-router-react'
import { Bonus } from '../model'
import { editBonusRoute } from '@/shared/routes'

export function BonusCard({ bonus }: { bonus: Bonus }) {
  return (
    <div className="w-full bg-white rounded-lg p-[20px]">
      <div className="w-full grid grid-cols-3 gap-[20px]">
        <div className="w-full flex flex-col justify-between">
          <div>
            <p className="text-xs text-black/50">название бонусной программы</p>
            <p className="text-lg">{bonus.name}</p>
          </div>
          <div>
            <p>Количество инвайт-кодов:</p>
            <p>
              <span className="text-green">{bonus.all}</span>/<span className="text-blue-600">{bonus.left}</span>/
              <span className="text-red">{bonus.used}</span>
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col justify-start">
          <p>Краткое описание бонусной программы</p>
          <div className="border border-black text-xs text-black/50 rounded-lg p-[10px] flex flex-col gap-[5px]">
            <p>Кем создано: {bonus.creator}</p>
            <p>Дата создания: {bonus.date}</p>
            <p>Вознаграждение: {bonus.reward}</p>
            <p>Дни до завершения: {bonus.lasts}</p>
          </div>
        </div>
        <div className="w-full flex flex-col justify-start">
          <p>Пометки для администратора</p>
          <div className="border border-black text-xs text-black/50 rounded-lg p-[10px] flex flex-col gap-[5px]">
            {bonus.note}
          </div>
        </div>
      </div>
      <div className="w-full mt-[20px] grid grid-cols-2 gap-[20px]">
        <div className="flex gap-[10px]">
          <Link
            to={editBonusRoute}
            params={{ id: bonus.id.toString() }}
            className="bg-green rounded-lg px-[10px] py-[7px] text-xl text-white underline"
          >
            РЕДАКТИРОВАТЬ
          </Link>
          <button className="bg-red rounded-lg px-[10px] py-[7px] text-xl text-white underline">ОСТАНОВИТЬ</button>
          <button className="bg-red rounded-lg px-[10px] py-[7px] text-xl text-white underline">УДАЛИТЬ</button>
        </div>
        <p className="text-xl">
          СТАТУС РАБОТЫ:{' '}
          <span className={bonus.status ? 'text-green' : 'text-red'}>{bonus.status ? 'РАБОТАЕТ' : 'НЕ АКТИВИРОВАН'}</span>
        </p>
      </div>
    </div>
  )
}
