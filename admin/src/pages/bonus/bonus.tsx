import { ExternalBonusDashboard, InternalBonusDashboard } from '@/entities/bonus/ui'
import { Header } from '@/widgets/header'

export function BonusPage() {
  return (
    <>
      <Header />
      <main className="w-full bg-white px-[40px] flex flex-col gap-[30px] py-[20px]">
        <div className="w-full grid grid-cols-3 gap-[20px] text-xl underline">
          <p className="max-w-[300px]">СЕТ КАРТ/ РЕДАКТИРОВАНИЕ/ ДОБАВЛЕНИЕ</p>
          <p className="max-w-[300px]">ЗАДАНИЯ/ РЕДАКТИРОВАНИЕ/ ДОБАВЛЕНИЕ</p>
          <p className="max-w-[300px]">БОНУСЫ/ РЕДАКТИРОВАНИЕ/ ДОБАВЛЕНИЕ</p>
        </div>
        <InternalBonusDashboard />
        <ExternalBonusDashboard />
      </main>
    </>
  )
}
