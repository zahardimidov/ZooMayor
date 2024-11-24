import { SetCard } from '@/entities/sets/ui'
import { editSetRoute } from '@/shared/routes'
import { Header } from '@/widgets/header'
import { Link } from 'atomic-router-react'

export function SetsPage() {
  return (
    <>
      <Header />
      <main className="w-full bg-white px-[40px] py-[20px]">
        <div className="w-full grid grid-cols-3 underline text-xl gap-[20px]">
          <p className="max-w-[300px]">СЕТ КАРТ/ РЕДАКТИРОВАНИЕ/ ДОБАВЛЕНИЕ</p>
          <p className="max-w-[300px]">ЗАДАНИЯ/ РЕДАКТИРОВАНИЕ/ ДОБАВЛЕНИЕ</p>
          <p className="max-w-[300px]">БОНУСЫ/ РЕДАКТИРОВАНИЕ/ ДОБАВЛЕНИЕ</p>
        </div>
        <div className="w-full bg-grey mt-[40px] flex flex-col gap-[30px] rounded-lg px-[30px] py-[20px]">
          <div className="w-full grid grid-cols-2 gap-[10px]">
            <p className="text-xl underline">ВНУТРЕННИЕ СЕТЫ КАРТ</p>
            <Link
              to={editSetRoute}
              params={{ id: 'new' }}
              className="text-white text-xl underline bg-green max-w-max px-[10px] py-[5px] rounded-lg"
            >
              + ДОБАВИТЬ СЕТ
            </Link>
          </div>
          <SetCard
            set={{
              name: 'Bonus 1',
              creator: 'Ian',
              date: '12.12.2021',
              collected: 100000,
              lateStartDate: '10.10.2010',
              lasts: '3',
              note: 'Hello weo 1',
              reward: '1000',
              status: true,
              length: 4,
            }}
          />
          <SetCard
            set={{
              name: 'Bonus 1',
              creator: 'Ian',
              date: '12.12.2021',
              collected: 100000,
              lateStartDate: '10.10.2010',
              lasts: '3',
              note: 'Hello weo 1',
              reward: '1000',
              status: true,
              length: 4,
            }}
          />
        </div>
        <div className="w-full bg-grey mt-[40px] flex flex-col gap-[30px] rounded-lg px-[30px] py-[20px]">
          <div className="w-full grid grid-cols-2 gap-[10px]">
            <p className="text-xl underline">РЕКЛАМНЫЕ СЕТЫ ДЛЯ ПАРТНЕРОВ</p>
            <Link
              to={editSetRoute}
              params={{ id: 'new' }}
              className="text-white text-xl underline bg-green max-w-max px-[10px] py-[5px] rounded-lg"
            >
              + ДОБАВИТЬ СЕТ
            </Link>
          </div>
          <SetCard
            set={{
              name: 'Bonus 1',
              creator: 'Ian',
              date: '12.12.2021',
              collected: 100000,
              lateStartDate: '10.10.2010',
              lasts: '3',
              note: 'Hello weo 1',
              reward: '1000',
              status: true,
              length: 4,
            }}
          />
          <SetCard
            set={{
              name: 'Bonus 1',
              creator: 'Ian',
              date: '12.12.2021',
              collected: 100000,
              lateStartDate: '10.10.2010',
              lasts: '3',
              note: 'Hello weo 1',
              reward: '1000',
              status: true,
              length: 4,
            }}
          />
        </div>
      </main>
    </>
  )
}
