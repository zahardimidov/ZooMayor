import { Header } from '@/widgets/header'

export function EditModPage() {
  return (
    <>
      <Header />
      <main className="w-full bg-white px-[40px] py-[20px]">
        <div className="w-full relative bg-grey rounded-lg px-[30px] py-[20px]">
          <p className="text-xl underline max-w-[240px]">НАСТРОЙКИ: МОДЕРАТОРОВ/ ИСТОРИЯ ДЕЙСТВИЙ</p>
          <div className="w-full grid grid-cols-[1fr_2fr] mt-[30px] gap-[20px]">
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
                <div className="w-full">
                  <p className="text-[8px] text-black/50">A8T8 M BDEMA COSA8HHA &KK&YHT&</p>
                  <p className="px-[10px] py-[5px] bg-white rounded-lg flex justify-center">29.09.2024 14:03</p>
                </div>
              </div>
              <p className="underline">Имя модератора</p>
              <p className="text-[8px]">(oTOpaxaeT MMA MOAepaTopa, MMA MPMCBSHBBETER BAMMHMCTPATOPOM)</p>
              <p className="px-[10px] py-[5px] bg-white rounded-lg">29.09.2024 14:03</p>
              <p className="underline">Пароль модератора</p>
              <p className="text-[8px]">ароль молоратора для охода в админ паноль, пароль выдастся администратором</p>
              <p className="px-[10px] py-[5px] bg-white rounded-lg">*****************</p>
              <p className="underline">Аккаунт Telegram модератора</p>
              <p className="text-[8px]">(вписывается вручную администратором при создании аккаунта модератора)</p>
              <p className="px-[10px] py-[5px] bg-white rounded-lg">@rubik90</p>
              <p className="underline">Email модератора</p>
              <p className="text-[8px]">
                (Email модератора вписывается вручную администратором при создании аккаунта модератора)
              </p>
              <p className="px-[10px] py-[5px] bg-white rounded-lg">granictr67@gmail.com</p>
              <p className="underline">Краткое описание для администратора</p>
              <p className="px-[10px] py-[5px] bg-white rounded-lg">
                (краткое описание модератора для уточнения его возможностей и задач в работе с приложением)
              </p>
              <textarea
                className="bg-white outline-none rounded-lg px-[10px] mt-[10px] resize-none min-h-[100px] w-full py-[5px]"
                value={'Добавлени кО0 до 16:00. Не сложные задачи.'}
              />

              <p></p>
            </div>
            <div className="w-full">
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
                      <p>29.09.2024 14:03</p>
                      <p>редактировал аккаунт пользователя @rukui56</p>
                      <p>внесены изминения в баланс пользователя: было 1 000 000 стало 2 000 000</p>
                    </div>
                  ))}
              </div>
              <p className="text-lg underline mt-[20px]">Права модератора</p>
              <div className="w-full grid grid-cols-2 gap-[10px] text-sm bg-white p-[20px] rounded-lg relative pb-[40px]">
                <div className="flex items-center gap-[10px]">
                  <input type="checkbox" />
                  <p>Добавление и редкатрирование карт</p>
                </div>
                <div className="flex items-center gap-[10px]">
                  <input type="checkbox" />
                  <p>Доступ к настройкам пользователей</p>
                </div>
                <div className="flex items-center gap-[10px]">
                  <input type="checkbox" />
                  <p>Добавление и редкатрирование сет карт</p>
                </div>
                <div className="flex items-center gap-[10px]">
                  <input type="checkbox" />
                  <p>Настройки реферальной системы</p>
                </div>
                <div className="flex items-center gap-[10px]">
                  <input type="checkbox" />
                  <p>Добавление и редкатрирование заданий</p>
                </div>
                <div className="flex items-center gap-[10px]">
                  <input type="checkbox" />
                  <p>Настройки магазина</p>
                </div>
                <div className="flex items-center gap-[10px]">
                  <input type="checkbox" />
                  <p>Добавление и редкатрирование 6OHYCOB</p>
                </div>
                <div className="flex items-center gap-[10px]">
                  <input type="checkbox" />
                  <p>Прочие настройки приложения</p>
                </div>
                <button className="absolute bottom-[20px] right-[20px] bg-green px-[10px] py-[5px] rounded-lg text-white">
                  выбрать все
                </button>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end gap-[20px]">
            <button className="bg-red px-[10px] py-[5px] rounded-lg text-white">активировать/ деактивировать</button>
            <button className="bg-red px-[10px] py-[5px] rounded-lg text-white">УДАЛИТЬ АККАУНТ</button>
            <button className="bottom-[20px] right-[20px] bg-green px-[10px] py-[5px] rounded-lg text-white">
              РЕДАКТИРОВАТЬ/СОХРАНИТЬ
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
