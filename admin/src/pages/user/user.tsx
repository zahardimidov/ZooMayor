import { editUserRoute } from '@/shared/routes'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion'
import { Header } from '@/widgets/header'
import { Link } from 'atomic-router-react'

function User({
  id,
  name,
  status = false,
  lastseen,
  referrals,
  cityLevel,
  tokens,
  income,
}: {
  id: number
  name: string
  status?: boolean
  lastseen: string
  referrals: number
  cityLevel: number
  tokens: number
  income: string
}) {
  return (
    <AccordionItem value={id.toString()} className="bg-white rounded-lg">
      <AccordionTrigger className="w-full grid grid-cols-2 p-[10px]">
        <div className="w-full flex gap-[20px]">
          <div className="flex flex-col gap-[3px]">
            <p className="underline">Имя пользователя Telegram</p>
            <p className="text-[8px] text-black/50">(отображает имя с которым пользователь зарегистрировался в Telegram)</p>
            <p className="text-blue-500 text-lg">{name}</p>
          </div>
          <div className="flex justify-between flex-col">
            <p className="underline">Статус аккаунта</p>
            <p className={`text-lg ${status ? 'text-green' : 'text-red'}`}>{status ? 'АКТИВЕН' : 'НЕ АКТИВЕН'}</p>
          </div>
        </div>
        <div className="w-full flex justify-end gap-[20px]">
          <Link
            to={editUserRoute}
            params={{ id: id.toString() }}
            className="bg-green rounded-lg px-[10px] py-[7px] text-xl text-white underline"
          >
            РЕДАКТИРОВАТЬ
          </Link>
          <button className="bg-red rounded-lg px-[10px] py-[7px] text-xl text-white underline">БАН</button>
        </div>
      </AccordionTrigger>
      <AccordionContent className="w-full grid grid-cols-3 gap-[20px] p-[10px]">
        <div className="w-full border-r border-black">
          <p className="mt-[20px] text-xs text-black/50">дата и время последнего входа</p>
          <p>{lastseen}</p>
        </div>
        <div className="w-full border-r border-black">
          <p className="underline">Приглашенные рефералы</p>
          <p>{referrals}</p>
          <p className="undeline">Уровень города польователя</p>
          <p>{cityLevel}</p>
        </div>
        <div className="w-full">
          <p className="underline">Баланс токенов</p>
          <p>{tokens}</p>
          <p>Доходность в час</p>
          <p>{income}</p>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

export function UserPage() {
  return (
    <>
      <Header />
      <main className="w-full bg-white px-[40px] py-[20px] flex flex-col gap-[30px]">
        <div className="w-full grid grid-cols-3 gap-[10px] text-xl underline">
          <p>СПИСОК ПОЛЬЗОВАТЕЛЕЙ</p>
          <p>СПИСОК МОДЕРАТОРОВ</p>
        </div>
        <div className="w-full bg-grey px-[30px] py-[20px] rounded-lg flex flex-col gap-[20px]">
          <p className="text-lg underline">Пользователи</p>
          <Accordion type="multiple" className="flex flex-col gap-[20px]">
            <User
              id={0}
              income={'10000/hour'}
              tokens={100000}
              cityLevel={5}
              referrals={25}
              lastseen="12.01.1991"
              name="User 1"
              status
            />
            <User
              id={1}
              income={'10000/hour'}
              tokens={100000}
              cityLevel={5}
              referrals={25}
              lastseen="12.01.1991"
              name="User 1"
              status
            />
            <User
              id={2}
              income={'10000/hour'}
              tokens={100000}
              cityLevel={5}
              referrals={25}
              lastseen="12.01.1991"
              name="User 1"
              status
            />
          </Accordion>
        </div>
      </main>
    </>
  )
}
