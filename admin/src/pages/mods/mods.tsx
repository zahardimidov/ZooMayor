import { editModRoute } from '@/shared/routes'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion'
import { Header } from '@/widgets/header'
import { Link } from 'atomic-router-react'

function Mod({
  id,
  name,
  status = false,
  date,
  lastseen,
  description,
  actions,
}: {
  id: number
  name: string
  status?: boolean
  date: string
  lastseen: string
  description: string
  actions: string[]
}) {
  return (
    <AccordionItem value={id.toString()} className="bg-white rounded-lg">
      <AccordionTrigger className="w-full grid grid-cols-2 p-[10px]">
        <div className="w-full flex gap-[20px]">
          <div className="flex flex-col gap-[3px]">
            <p className="underline">Имя модератора</p>
            <p className="text-[8px] text-black/50">(отображает имя модератора, имя присваивается администратором)</p>
            <p className="text-blue-500 text-lg">{name}</p>
          </div>
          <div className="flex justify-between flex-col">
            <p className="underline">Статус аккаунта</p>
            <p className={`text-lg ${status ? 'text-green' : 'text-red'}`}>{status ? 'АКТИВЕН' : 'НЕ АКТИВЕН'}</p>
          </div>
        </div>
        <div className="w-full flex justify-end gap-[20px]">
          <Link
            to={editModRoute}
            params={{ id: id.toString() }}
            className="bg-green rounded-lg px-[10px] py-[7px] text-xl text-white underline"
          >
            РЕДАКТИРОВАТЬ
          </Link>
          <button className="bg-red rounded-lg px-[10px] py-[7px] text-xl text-white underline">УДАЛИТЬ</button>
        </div>
      </AccordionTrigger>
      <AccordionContent className="w-full grid grid-cols-3 gap-[20px] p-[10px]">
        <div className="w-full border-r border-black">
          <p className="text-xs text-black/50">дата и время созлания аккаунта.</p>
          <p>{date}</p>
          <p className="mt-[20px] text-xs text-black/50">дата и время последнего входа</p>
          <p>{lastseen}</p>
        </div>
        <div className="w-full border-r border-black">
          <p className="underline">Краткое описание</p>
          <p className="text-[8px] text-black/50">Краткое описание для администратора</p>
          <p>{description}</p>
        </div>
        <div className="w-full">
          <p className="underline">Последние действия</p>
          <p className="text-xs text-black/50">(последние 20 действий модератора)</p>
          <div className="w-full h-full max-h-[100px] overflow-scroll">
            {actions.map((action, index) => (
              <p key={index} className="mt-[10px]">
                {action}
              </p>
            ))}
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}

export function ModsPage() {
  return (
    <>
      <Header />
      <main className="w-full bg-white px-[40px] py-[20px]">
        <div className="w-full bg-grey rounded-lg px-[30px] py-[20px]">
          <p className="text-lg underline">Модераторы</p>
          <div className="w-full flex items-end justify-between mt-[10px]">
            <p className="text-black/50 text-xs max-w-[200px]">
              список и краткая информация о модераторах с возможностью добавления и редактирования
            </p>
            <Link
              to={editModRoute}
              params={{ id: 'new' }}
              className="bg-green text-white max-w-max px-[10px] py-[5px] rounded-lg"
            >
              + ДОБАВИТЬ МОДЕРАТОРА
            </Link>
          </div>
          <Accordion type="multiple" className="mt-[30px] gap-[20px] flex flex-col">
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <Mod
                  key={index}
                  id={index}
                  name="Andrey"
                  status
                  date="29.09.2024 14:03"
                  lastseen="29.09.2024 14:03"
                  description="Добавление коро 16:00. Не сложные задачи."
                  actions={[
                    'редактировал аккаунт пользователя @rukui56',
                    'создал сет карт «Полиция»',
                    'создал бонусную компанию «Промо ТГ»',
                    'создал задание «Подпишисть на ТГ канал»',
                    'добавил карту «Врач»',
                  ]}
                />
              ))}
          </Accordion>
        </div>
      </main>
    </>
  )
}
