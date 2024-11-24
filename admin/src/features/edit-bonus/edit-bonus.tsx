import { useUnit } from 'effector-react'
import {
  $hasLink,
  $hourly,
  $link,
  $name,
  $oneTime,
  $rewardType,
  $xp,
  hasLinkChanged,
  hourlyChanged,
  linkChanged,
  nameChanged,
  oneTimeChanged,
  rewardTypeChanged,
  xpChanged,
} from './model'
import { Link } from 'atomic-router-react'
import { bonusRoute } from '@/shared/routes'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'

export function EditBonus() {
  const [name, changeName] = useUnit([$name, nameChanged])
  const [hasLink, changeHasLink] = useUnit([$hasLink, hasLinkChanged])
  const [link, changeLink] = useUnit([$link, linkChanged])
  const [rewardType, changeRewardType] = useUnit([$rewardType, rewardTypeChanged])
  const [oneTime, changeOneTime] = useUnit([$oneTime, oneTimeChanged])
  const [hourly, changeHourly] = useUnit([$hourly, hourlyChanged])
  const [xp, changeXp] = useUnit([$xp, xpChanged])

  return (
    <div className="w-full px-[60px] py-[20px] relative bg-grey rounded-xl flex flex-col">
      <p className="text-xl underline max-w-[350px]">ВНУТРЕННИЕ БОНУСЫ РЕДАКТИРОВАНИЕ/ДОБАВЛЕНИЕ</p>
      <Link
        to={bonusRoute}
        className="absolute cursor-pointer text-white size-[30px] bg-red rounded-md flex items-center justify-center top-[20px] right-[20px]"
      >
        X
      </Link>
      <div className="w-full grid grid-cols-3 mt-[10px] gap-[30px]">
        <div className="w-full flex flex-col">
          <p className="text-lg underline">НАЗВАНИЕ БОНУСНОЙ ПРОГРАММЫ</p>
          <textarea
            className="w-full bg-white min-h-[100px] resize-none mt-[10px] outline-none rounded-lg px-[10px] py-[5px]"
            placeholder="введите название"
            value={name}
            onChange={(e) => changeName(e.target.value)}
          />
          <div className="w-full mt-[10px] flex justify-between">
            <p className="text-lg underline">ССЫЛКА</p>
            <input type="checkbox" className="accent-green" checked={hasLink} onChange={(e) => changeHasLink(e.target.checked)} />
          </div>
          <p className="text-[8px] text-black/50">ссылка на рекламируемый ресурс, ели предусмотрено</p>
          <input
            className="w-full bg-white outline-none rounded-lg px-[10px] py-[5px] mt-[10px]"
            placeholder="введите ссылку"
            value={link}
            onChange={(e) => changeLink(e.target.value)}
            disabled={!hasLink}
          />
          <p className="mt-[10px] text-lg underline">ВОЗНАГРАЖДЕНИЕ ЗА ВВОД КОДА</p>
          <p className="text-[8px] text-black/50">выберите вознаграждение за ввод кода</p>
          <div className="w-full mt-[10px] flex justify-between">
            <p className="text-lg underline">Единоразовое вознаграждение</p>
            <input
              type="radio"
              className="accent-green"
              name="reward"
              checked={rewardType == 'one-time'}
              onChange={() => changeRewardType('one-time')}
            />
          </div>
          <input
            className="w-full bg-white outline-none rounded-lg px-[10px] py-[5px] mt-[10px]"
            placeholder="введите единоразовое вознаграждение"
            value={oneTime}
            onChange={(e) => changeOneTime(e.target.value)}
          />
          <div className="w-full mt-[10px] flex justify-between">
            <p className="text-lg underline">Ежечасное вознаграждение</p>
            <input
              type="radio"
              className="accent-green"
              name="reward"
              checked={rewardType == 'hourly'}
              onChange={() => changeRewardType('hourly')}
            />
          </div>
          <input
            className="w-full bg-white outline-none rounded-lg px-[10px] py-[5px] mt-[10px]"
            placeholder="введите ежечасное вознаграждение"
            value={hourly}
            onChange={(e) => changeHourly(e.target.value)}
          />
          <div className="w-full mt-[10px] flex justify-between">
            <p className="text-lg underline">Вознаграждение опытом</p>
            <input
              type="radio"
              className="accent-green"
              name="reward"
              checked={rewardType == 'xp'}
              onChange={() => changeRewardType('xp')}
            />
          </div>
          <input
            className="w-full bg-white outline-none rounded-lg px-[10px] py-[5px] mt-[10px]"
            placeholder="введите колличество опыта"
            value={xp}
            onChange={(e) => changeXp(e.target.value)}
          />
        </div>
        <div className="w-full h-full flex justify-between flex-col">
          <div className="w-full flex flex-col">
            <div className="w-full mt-[10px] flex justify-between">
              <p className="text-lg underline">ОБЫЧНЫЕ ИНВАЙТ-КОДЫ</p>
              <input type="checkbox" className="accent-green" />
            </div>
            <p className="text-[8px] text-black/50">
              установите необходимое количество кодов, если требуется более одного. напишите код, если требуется только один
            </p>
            <div className="w-full grid grid-cols-2 items-start gap-[10px]">
              <div className="w-full flex flex-col gap-[10px]">
                <input
                  className="w-full bg-white outline-none rounded-lg px-[10px] py-[5px] mt-[10px]"
                  placeholder="введите колличество"
                />
                <p className="text-[8px] text-black/50">введите необходимое количество кодов и выберите формат файла</p>
              </div>
              <div className="w-full flex flex-col gap-[10px]">
                <Select>
                  <SelectTrigger className="mt-[10px]">
                    <SelectValue placeholder="выберите формат" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="txt">формат TXT</SelectItem>
                    <SelectItem value="docx">формат DOCX</SelectItem>
                    <SelectItem value="pdf">формат PDF</SelectItem>
                  </SelectContent>
                </Select>
                <div className="w-full grid grid-cols-2 gap-[10px]">
                  <button className="bg-white rounded-md p-0">файл готов</button>
                  <button className="bg-green text-white underline rounded-lg">СКАЧАТЬ</button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col">
            <div className="w-full mt-[10px] flex justify-between">
              <p className="text-lg underline">Вознаграждение картами</p>
              <input type="checkbox" className="accent-green" />
            </div>
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
        </div>
        <div className="w-full flex flex-col">
          <div className="w-full mt-[10px] flex justify-between">
            <p className="text-lg underline">КОРОТКИЕ ИНВАЙТ-КОДЫ</p>
            <input type="checkbox" />
          </div>
          <input
            className="w-full mt-[10px] bg-white outline-none rounded-md px-[10px] py-[5px]"
            placeholder="введите буквенно-числовой код"
          />
          <div className="w-full mt-[10px] flex justify-between">
            <p className="text-lg underline">Многоразовый код</p>
            <input type="radio" name="code-type" />
          </div>
          <div className="w-full flex items-center gap-[10px]">
            <p className="text-lg underline">Ограниченый код</p>
            <input
              className="w-full bg-white outline-none rounded-md px-[10px] py-[5px]"
              placeholder="введите кол-во кодов от 2"
            />
            <input type="radio" name="code-type" />
          </div>
          <div className="w-full mt-[10px] flex justify-between">
            <p className="text-lg underline">Таймер бонусной программы</p>
            <input type="radio" name="code-type" />
          </div>
          <div className="w-full flex items-start gap-[10px] mt-[10px]">
            <p className="underline">Дни</p>
            <input className="bg-white outline-none px-[5px] py-[3px] rounded-lg max-w-[150px]" placeholder="введите кол-во" />
            <p className="w-full text-[8px] text-black/50">
              Введите необходимое количество дней. В течении этого срока бонусная система будет активна, по истечению этого срока
              бонусная система завершит работу вне зависимости от количества оставшихся активации
            </p>
          </div>
          <div className="w-full bg-white mt-[10px] rounded-lg px-[20px] py-[10px] grid grid-cols-2 gap-[10px] justify-between">
            <div className="flex flex-col gap-[10px]">
              <p className="underline">СТАТУС БОНУСНОЙ ПРОГРАММЫ</p>
              <p className="text-xl text-green underline">РАБОТАЕТ</p>
              <button className="bg-grey text-white underline rounded-lg">АКТИВИРОВАТЬ</button>
            </div>
            <div className="flex flex-col gap-[10px]">
              <p className="underline">ОСТАТОК ДНЕЙ ДО ЗАВЕРШЕНИЯ</p>
              <p className="text-xl text-green underline">28</p>
              <button className="bg-red text-white underline rounded-lg">ОСТАНОВИТЬ</button>
            </div>
          </div>
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
  )
}
