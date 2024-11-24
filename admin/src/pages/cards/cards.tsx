import { CardBackDashboard } from '@/entities/card-back/ui'
import { ResidentsDashboard } from '@/entities/cards/residents-ui'
import { CitiesDashboard } from '@/entities/cards/cities-ui'
import { MapIcon } from '@/shared/icons'
import { Header } from '@/widgets/header'
import { CitySetsDashboard } from '@/entities/sets/city-sets-ui'
import { ResidentSetsDashboard } from '@/entities/sets/resident-sets-ui'

export function CardsPage() {
  return (
    <>
      <Header />
      <main className="w-full flex flex-col px-[60px] py-[20px] gap-[40px]">
        <div className="flex items-center gap-[20px] mb-[20px]">
          <div className="size-[90px] flex items-center justify-center">
            <MapIcon />
          </div>
          <p className="underline text-lg max-w-[300px]">ДОБАВЛЕНИЕ/ РЕДАКТИРОВАНИЕ: КАРТ ЖИТЕЛИ/ГОРОД И НАБОРОВ</p>
        </div>
        <CardBackDashboard />
        <ResidentsDashboard />
        <CitiesDashboard />
        <CitySetsDashboard />
        <ResidentSetsDashboard />
      </main>
    </>
  )
}
