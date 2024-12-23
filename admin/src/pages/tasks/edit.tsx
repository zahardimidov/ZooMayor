import { Header } from '@/widgets/header'

export function EditTaskPage() {
  return (
    <>
      <Header />
      <main className="w-full bg-white px-[40px] py-[20px]">
        <div className="w-full rounded-lg bg-grey px-[30px] py-[20px] relative">
          <p className="text-xl underline">ЗАДАНИЕ РЕДАКТИРОВАНИЕ/ДОБАВЛЕНИЕ</p>
          <div className="w-full flex gap-[20px]">
            <div className="size-[100px] text-black/50 text-xs rounded-lg bg-white shadow-black shadow-md flex justify-center items-center text-center">
              добавьте изображение...
            </div>
            <div className="flex flex-col gap-[10px]">
              <p className="text-lg underline">НАЗВАНИЕ ЗАДАНИЯ</p>
              <input className="bg-white outline-none rounded-lg px-[10px] py-[5px] w-[300px]" placeholder="введите название" />
              <div className="w-full flex gap-[10px] items-start">
                <p className="text-lg underline">
                  Положение
                  <br />
                  задания
                </p>
                <input className="bg-white outline-none rounded-lg px-[10px] py-[5px] w-[160px]" placeholder="введите от 1" />
              </div>
              <p className="text-xs text-black/50">
                Определяет положение задания
                <br />в списке заданий у пользователей
              </p>
            </div>
            <div className="flex flex-col">
              <div className="flex gap-[30px]">
                <p className="text-lg underline">ТАЙМЕР</p>
                <input type="checkbox" />
              </div>
              <p className="text-[8px] max-w-[200px] text-black/50">
                (установите таймер после отсчета которого можно выполнить задание заново)
              </p>
              <input
                className="bg-white outline-none rounded-lg px-[10px] mt-[10px] py-[5px] w-[300px]"
                placeholder="введите время в мин."
              />
              <p className="text-[8px] text-black/50 max-w-[200px]">ПРИ ВКЛЮЧЕНИИ АКТИВИРУЕТСЯ ТАЙМЕР РЕСТАРТА ЗАДАНИЯ</p>
            </div>
          </div>
          <div className="w-full grid grid-cols-3 gap-[20px]">
            <div className="w-full">
              <p className="text-lg underline">ССЫЛКА</p>
              <p className="text-[8px] text-black/50">(ссылка на рекламируемый ресурс)</p>
              <input
                className="bg-white outline-none rounded-lg px-[10px] mt-[10px] py-[5px] w-full"
                placeholder="введите ссылку если ссылки нет введите -"
              />
              <p className="text-lg underline mt-[10px]">ВОЗНАГРАЖДЕНИЕ ЗА ВЫПОЛНЕНИЕ</p>
              <p className="text-[8px] text-black/50">(выберите вознаграждение за выполнение задания)</p>
              <div className="w-full flex flex-col gap-[5px]">
                <div className="w-full flex justify-between gap-[10px]">
                  <p className="underline">Единоразовое вознаграждение</p>
                  <input type="radio" name="hello" />
                </div>
                <p className="text-black/50 text-[8px]">
                  (единоразоваое вознаграждение за выполнение задания в токенах приложения)
                </p>
                <input
                  className="bg-white outline-none rounded-lg px-[10px] py-[5px] w-full"
                  placeholder="введите единоразовое вознаграждение"
                />
              </div>
              <div className="w-full flex flex-col gap-[5px]">
                <div className="w-full flex justify-between gap-[10px]">
                  <p className="underline">Ежечасное вознаграждение</p>
                  <input type="radio" name="hello" />
                </div>
                <p className="text-black/50 text-[8px]">(ежечасное вознаграждение за выполнение задания)</p>
                <input
                  className="bg-white outline-none rounded-lg px-[10px] py-[5px] w-full"
                  placeholder="введите ежечасное вознаграждение"
                />
              </div>
              <div className="w-full flex flex-col gap-[5px]">
                <div className="w-full flex justify-between gap-[10px]">
                  <p className="underline">Вознаграждение опытом</p>
                  <input type="radio" name="hello" />
                </div>
                <p className="text-black/50 text-[8px]">(единоразовое начисление опыта за выполнение задания)</p>
                <input
                  className="bg-white outline-none rounded-lg px-[10px] py-[5px] w-full"
                  placeholder="введите колличество опыта"
                />
              </div>
            </div>
            <div className="w-full flex flex-col">
              <div className="w-full mt-[10px] flex justify-between">
                <p className="text-lg underline">Вознаграждение картами</p>
                <input type="checkbox" />
              </div>
              <p className="text-[8px] text-black/50">(ежечасное вознаграждение за выполнение задания)</p>
              <div className="w-full grid grid-cols-2 gap-[10px] mt-[10px]">
                <input className="w-full bg-white outline-none rounded-md px-[10px] py-[5px]" placeholder="количество карт" />
                <input className="w-full bg-white outline-none rounded-md px-[10px] py-[5px]" placeholder="выберите карты" />
              </div>
              <div className="w-full mt-[10px] bg-white rounded-lg p-[10px]">
                <p className="underline text-black/50">список выбранных карт для вознаграждения</p>
                <div className="w-full text-black/50 text-sm text-center border-b border-b-black/50 grid grid-cols-3">
                  <p>имя карты</p>
                  <p>изображение</p>
                  <p>редкость</p>
                </div>
                <div className="w-full max-h-[200px] overflow-scroll">
                  {Array(10)
                    .fill(null)
                    .map((_, index) => (
                      <div
                        className="w-full grid grid-cols-3 items-center relative border-b text-center text-black/50 border-b-black/50 py-[4px]"
                        key={index}
                      >
                        <p>TECT</p>
                        <div className="w-[50px] mx-auto aspect-[1/1.6] rounded-lg bg-grey"></div>
                        <p>75</p>
                        <div className="absolute bg-red size-[15px] text-white flex items-center text-xs rounded-sm top-[5px] right-[5px] justify-center">
                          x
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col">
              <p className="text-xl underline">ОПИСАНИЕ ЗАДАНИЯ</p>
              <textarea
                className="w-full bg-white min-h-[200px] resize-none mt-[10px] outline-none rounded-lg px-[10px] py-[5px]"
                placeholder="введите текст"
              />
              <p className="text-xl underline">ПОМЕТКИ ДЛЯ АДМИНИСТРАТОРА</p>
              <textarea
                className="w-full bg-white min-h-[100px] resize-none mt-[10px] outline-none rounded-lg px-[10px] py-[5px]"
                placeholder="введите текст"
              />
              <button className="bg-green text-white rounded-lg text-xl py-[3px] mt-[10px] self-end px-[10px]">
                РЕДАКТИРОВАТЬ/СОХРАНИТЬ
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
