import { editTaskRoute } from '@/shared/routes'
import { Header } from '@/widgets/header'
import { Link } from 'atomic-router-react'

function Task({
  photo,
  heading,
  description,
  hasSecret = false,
  spot,
  link,
  reward,
  cooldown,
}: {
  photo: string
  heading: string
  description: string
  hasSecret?: boolean
  spot: number
  link: string
  reward: string
  cooldown: string
}) {
  return (
    <div className="w-full bg-white rounded-lg px-[30px] py-[10px] grid grid-cols-2 gap-[10px]">
      <div className="w-full flex flex-col gap-[10px]">
        <div className="w-full items-start flex gap-[10px]">
          <img src={photo} className="size-[200px]" />
          <div className="flex flex-col gap-[20px]">
            <p className="text-lg">{heading}</p>
            <p>{description}</p>
          </div>
          {hasSecret && <div className="bg-grey w-[60px] aspect-[1/1.6] rounded-lg"></div>}
        </div>
        <div className="w-full flex justify-end gap-[30px]">
          <Link
            to={editTaskRoute}
            params={{ id: '0' }}
            className="bg-green rounded-lg px-[10px] py-[7px] text-xl text-white underline"
          >
            РЕДАКТИРОВАТЬ
          </Link>
          <button className="bg-red rounded-lg px-[10px] py-[7px] text-xl text-white underline">УДАЛИТЬ</button>
        </div>
      </div>
      <div className="w-full">
        <p>Описание реламы для администратора</p>
        <div className="w-full border p-[10px] border-black rounded-lg">
          <p>Место в приложениие: {spot}</p>
          <p>Рекламная ссылка: {link}</p>
          <p>Вознаграждение: {reward}</p>
          <p>Таймер перезапуска: {cooldown}</p>
        </div>
      </div>
    </div>
  )
}

export function TasksPage() {
  return (
    <>
      <Header />
      <main className="w-full bg-white px-[40px] py-[20px]">
        <div className="w-full grid grid-cols-3 gap-[10px] underline text-xl">
          <p className="max-w-[300px]">СЕТ КАРТ/ РЕДАКТИРОВАНИЕ/ ДОБАВЛЕНИЕ</p>
          <p className="max-w-[300px]">ЗАДАНИЯ/ РЕДАКТИРОВАНИЕ/ ДОБАВЛЕНИЕ</p>
          <p className="max-w-[300px]">БОНУСЫ/ РЕДАКТИРОВАНИЕ/ ДОБАВЛЕНИЕ</p>
        </div>
        <div className="w-full mt-[40px] bg-grey px-[30px] flex flex-col gap-[30px] rounded-lg py-[20px]">
          <div className="w-full grid grid-cols-2 gap-[10px] items-center">
            <p className="text-xl underline">РЕКЛАМА</p>
            <Link
              to={editTaskRoute}
              params={{ id: 'new' }}
              className="text-white text-xl underline bg-green max-w-max px-[10px] py-[5px] rounded-lg"
            >
              + ДОБАВИТЬ РЕКЛАМУ
            </Link>
          </div>
          <Task
            cooldown="30 мин."
            reward="Карта (Название карты и ID)"
            link="Https://youtube.com"
            spot={1}
            description="Hello owl wodsjc"
            hasSecret
            heading="AD 1"
            photo="/blue-card-back.png"
          />
          <Task
            cooldown="30 мин."
            reward="Карта (Название карты и ID)"
            link="Https://youtube.com"
            spot={1}
            description="Hello owl wodsjc"
            hasSecret
            heading="AD 2"
            photo="/blue-card-back.png"
          />
        </div>
        <div className="w-full mt-[40px] bg-grey px-[30px] flex flex-col gap-[30px] rounded-lg py-[20px]">
          <div className="w-full grid grid-cols-2 gap-[10px] items-center">
            <p className="text-xl underline">ЗАДАНИЯ</p>
            <Link
              to={editTaskRoute}
              params={{ id: 'new' }}
              className="text-white text-xl underline bg-green max-w-max px-[10px] py-[5px] rounded-lg"
            >
              + ДОБАВИТЬ ЗАДАНИЕ
            </Link>
          </div>
          <Task
            cooldown="30 мин."
            reward="Карта (Название карты и ID)"
            link="Https://youtube.com"
            spot={1}
            description="Hello owl wodsjc"
            heading="Task 1"
            photo="/blue-card-back.png"
          />
          <Task
            cooldown="30 мин."
            reward="Карта (Название карты и ID)"
            link="Https://youtube.com"
            spot={1}
            description="Hello owl wodsjc"
            heading="Tas 2"
            photo="/blue-card-back.png"
          />
        </div>
      </main>
    </>
  )
}
