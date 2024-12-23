import {
  BoxIcon,
  CabinetIcon,
  GraphIcon,
  GrowthIcon,
  MapIcon,
  PeopleIcon,
  SettingsIcon,
  ShopIcon,
  TodoIcon,
} from '@/shared/icons'
import { cardsRoute, editModRoute, homeRoute, setsRoute } from '@/shared/routes'
import { Header } from '@/widgets/header'
import { LinkCard } from '@/widgets/link-card'
import { StatisticCard } from '@/widgets/statistic-card'

export function HomePage() {
  const newUsers = '+1036' // new users for the last 24 hours
  const allUsers = '1 203 636' // all users
  const cardsOpened = '10 593 737' // amount of cards opened in the last 24 hours
  return (
    <>
      <Header />
      <main className="w-full grid grid-cols-3 px-[60px] py-[30px] gap-x-[100px] gap-y-[50px]">
        <StatisticCard heading="Новые пользователи за 24 часа" data={newUsers} icon={<GrowthIcon />} />
        <StatisticCard heading="Общее количество пользователей" data={allUsers} icon={<PeopleIcon />} />
        <StatisticCard heading="Карт открыто за 24 часа" data={cardsOpened} icon={<BoxIcon />} />
        <LinkCard
          to={cardsRoute}
          params={{ id: 'new' }}
          heading="ДОБАВЛЕНИЕ/ РЕДАКТИРОВАНИЕ: КАРТ ЖИТЕЛИ/ГОРОД И НАБОРОВ"
          icon={<MapIcon />}
        />
        <LinkCard
          to={setsRoute}
          params={{ id: 'new' }}
          heading="ДОБАВЛЕНИЕ/ РЕДАКТИРОВАНИЕ: СЕТ КАРТ/ЗАДАНИЯ/БОНУСЫ"
          icon={<TodoIcon />}
        />
        <LinkCard
          to={editModRoute}
          params={{ id: 'new' }}
          heading="СПИСОК И НАСТРОЙКИ: ПОЛЬЗОВАТЕЛЕЙ/ИСТОРИЯ ДЕЙСТВИЙ ПОЛЬЗОВАТЕЛЕЙ"
          icon={<CabinetIcon />}
        />
        <LinkCard to={homeRoute} heading="НАСТРОЙКИ РЕФЕРАЛЬНОЙ СИСТЕМЫ" icon={<GraphIcon />} />
        <LinkCard to={homeRoute} heading="НАСТРОЙКИ МАГАЗИНА/КОШЕЛЬКА ПОЛЬЗОВАТЕЛЕЙ" icon={<ShopIcon />} />
        <LinkCard to={homeRoute} heading="ПРОЧИЕ НАСТРОЙКИ ПРИЛОЖЕНИЯ" icon={<SettingsIcon />} />
      </main>
    </>
  )
}
