import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from '@/shared/ui/carousel'
import { Header } from '@/widgets/header'

export function EditUserPage() {
  return (
    <>
      <Header />
      <main className="w-full bg-white px-[40px] py-[20px]">
        <div className="w-full relative bg-grey rounded-lg px-[30px] py-[20px]">
          <div className="w-full flex gap-[20px]">
            <p className="text-xl underline max-w-[240px]">НАСТРОЙКИ: ПОЛЬЗОВАТЕЛЕЙ ИСТОРИЯ ДЕЙСТВИЙ</p>
            <div className="w-full flex gap-[10px]">
              <div className="flex flex-col gap-[3px]">
                <p>Повышенная удача</p>
                <p className="text-xs max-w-[300px]">
                  Используется для корректировки шансов выпадения карт для этого аккаунта. установите диапазон редкости карт.
                  карты будут выпадать только с этого диапазона редкости
                </p>
                <div className="flex gap-[7px] items-center">
                  <p className="text-xl">от</p>
                  <input className="bg-white px-[10px] outline-none rounded-lg w-[100px]" />
                  <p className="text-xl">до</p>
                  <input className="bg-white px-[10px] outline-none rounded-lg w-[100px]" />
                </div>
              </div>
              <div className="flex justify-between flex-col">
                <div className="flex gap-[5px] items-center">
                  <input type="checkbox" />
                  <p className="text-xs">Активация режима (установите флажок)</p>
                </div>
                <p className="text-xs max-w-[400px]">
                  <span className="text-red">ВНИМАНИЕ!</span> настройка используется только для рекламных аккаунтов! Вывод и
                  продажа токенов и карт <span className="text-red">ЗАПРЕЩЕНА!</span> По завершении рекламной компании аккаунт
                  ПОдлеЖит УДАЛЕНИЮ! Все токены, карты и прочие достижения <span className="text-red">СГОРАЮТ БЕЗВОЗВРАТНО!</span>
                </p>
              </div>
            </div>
          </div>
          <div className="w-full grid grid-cols-[1fr_2fr] overflow-hidden mt-[30px] gap-[20px]">
            <div className="w-full">
              <p className="underline">Статус аккаунта</p>
              <p className="text-[8px]">(отображается статус активности аккаунта, аккаунт активируется администратором)</p>
              <div className="w-full grid grid-cols-2 gap-[10px]">
                <div className="w-full">
                  <p className="text-[8px] text-black/50">статус аккаунта</p>
                  <p className="px-[10px] py-[5px] bg-white rounded-lg text-green text-lg flex justify-center">АКТИВЕН</p>
                </div>
                <div className="w-full">
                  <p className="text-[8px] text-black/50">дата и время послодного входа</p>
                  <p className="px-[10px] py-[5px] bg-white rounded-lg flex justify-center">29.09.2024 14:03</p>
                </div>
              </div>
              <p className="underline">Имя пользователя Telegram</p>
              <p className="px-[10px] py-[5px] bg-white rounded-lg">@rubik90</p>
              <div className="w-full grid grid-cols-2 gap-[5px]">
                <div className="w-full flex flex-col gap-[5px]">
                  <p>Уровень города</p>
                  <p className="text-green bg-white rounded-lg px-[5px] py-[3px] text-lg">25</p>
                </div>
                <div className="w-full flex flex-col gap-[5px]">
                  <p>Опыт</p>
                  <p className="bg-white rounded-lg px-[5px] py-[3px] text-lg">2 600 000</p>
                </div>
              </div>
              <p className="underline">Баланс токенов</p>
              <p className="px-[10px] py-[5px] bg-white rounded-lg">1 000 000</p>
              <p className="underline">Доходность в час</p>
              <p className="px-[10px] py-[5px] bg-white rounded-lg">22 000/4</p>
              <p className="underline">Общее количество карт у пользователя</p>
              <p className="px-[10px] py-[5px] bg-white rounded-lg">23 500</p>
              <p className="underline">Приглашенные рефералы</p>
              <div className="w-full mt-[10px] max-h-[160px] overflow-scroll bg-white rounded-lg p-[5px] text-sm">
                <p>Общее количество рефералов:</p>
                <p className="text-green text-lg">25</p>
                <div className="w-full grid grid-cols-3 border-b border-b-black justify-center text-xs gap-[5px]">
                  <p>Имя реферала</p>
                  <p>Дата приглашения</p>
                  <p>Уровень города</p>
                </div>
                {Array(10)
                  .fill(null)
                  .map((_, index) => (
                    <div key={index} className="w-full grid grid-cols-3 gap-[5px]">
                      <p>@Jungle23</p>
                      <p>29.09.2024 14:03</p>
                      <p>14</p>
                    </div>
                  ))}
              </div>
            </div>
            <div className="w-full overflow-hidden">
              <p>Последние действия</p>
              <div className="w-full bg-white max-h-[250px] overflow-scroll p-[10px] rounded-lg text-sm">
                <div className="w-full grid grid-cols-[2fr_3fr_4fr] border-b border-b-black">
                  <p>История действий</p>
                  <p>Поиск</p>
                  <p>Сортировка</p>
                </div>
                {Array(10)
                  .fill(null)
                  .map((_, index) => (
                    <div key={index} className="w-full grid grid-cols-[1fr_3fr_4fr] py-[5px]">
                      <p>29.09.2024 14:03 открыл карту в игре</p>
                      <p>получена карта (Полицейский ID 5437627251)</p>
                      <p>получены бонусы (+ 10000 токенов, + 1000/ч. +1000 Ехр)|</p>
                    </div>
                  ))}
              </div>
              <div className="w-full mt-[10px] grid grid-cols-[100px_1fr] gap-[10px]">
                <p>Карты пользователя</p>
                <p className="text-[8px] text-black/50">
                  карты пользователя отображаются по убыванию от самой редкой карты, карты можно удалить
                </p>
              </div>
              <div className="w-full bg-white rounded-lg p-[10px]">
                <div className="w-full justify-center gap-[50px] flex border-b border-b-black">
                  <p>Поиск</p>
                  <p>Сортировка</p>
                </div>
                <Carousel className="w-full">
                  <CarouselContent className="w-full gap-[10px]">
                    {Array(10)
                      .fill(null)
                      .map((_, index) => (
                        <div key={index} className="min-w-[130px] w-[130px] flex flex-col gap-[5px] text-[8px] items-center">
                          <img className="w-full h-[230px]" src="/blue-card-back.png" />
                          <p>«Бизнесмен»</p>
                          <p>(ID 2987853286716725)</p>
                          <p>Бонусы карты</p>
                          <p>+ 100000 Токенов</p>
                          <p>ДАТА ПОЛУЧЕНИЯ</p>
                          <p>29.09.2024 14:03</p>
                        </div>
                      ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
              <div className="w-full flex gap-[20px] mt-[20px]">
                <button className="bg-red px-[10px] py-[5px] rounded-lg text-white">БАН</button>
                <button className="bg-red px-[10px] py-[5px] rounded-lg text-white">УДАЛИТЬ АККАУНТ</button>
                <button className="bottom-[20px] right-[20px] bg-green px-[10px] py-[5px] rounded-lg text-white">
                  РЕДАКТИРОВАТЬ/СОХРАНИТЬ
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
