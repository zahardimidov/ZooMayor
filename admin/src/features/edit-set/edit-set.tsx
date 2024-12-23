import { setsRoute } from '@/shared/routes'
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from '@/shared/ui/carousel'
import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'
import {
  $activation,
  $cards,
  $description,
  $exp,
  $hourly,
  $minFriends,
  $minLevels,
  $name,
  $notes,
  $reward,
  $type,
  activationChanged,
  cardAdded,
  descriptionChanged,
  expChanged,
  hourlyChanged,
  minFriendsChanged,
  minLevelsChanged,
  nameChanged,
  notesChanged,
  rewardChanged,
  typeChanged,
} from './model'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { PhotoCard } from './photo-card'

export function EditSet() {
  const [cards, addCard] = useUnit([$cards, cardAdded])
  const [name, changeName] = useUnit([$name, nameChanged])
  const [reward, changeReward] = useUnit([$reward, rewardChanged])
  const [exp, changeExp] = useUnit([$exp, expChanged])
  const [hourly, changeHourly] = useUnit([$hourly, hourlyChanged])
  const [friends, changeFriends] = useUnit([$minFriends, minFriendsChanged])
  const [levels, changeLevels] = useUnit([$minLevels, minLevelsChanged])
  const [description, changeDescription] = useUnit([$description, descriptionChanged])
  const [type, changeType] = useUnit([$type, typeChanged])
  const [activation, changeActivation] = useUnit([$activation, activationChanged])
  const [notes, changeNotes] = useUnit([$notes, notesChanged])

  return (
    <div className="w-full bg-grey rounded-xl px-[70px] relative py-[20px]">
      <p className="underline text-xl max-w-[300px]">НАБОР КАРТ ЖИТЕЛЕЙ И ГОРОДА /РЕДАКТИРОВАНИЕ/СОЗДАНИЕ</p>
      <Link
        to={setsRoute}
        className="size-[30px] absolute top-[20px] right-[20px] bg-red items-center justify-center cursor-pointer rounded-md text-white text-xl flex"
      >
        X
      </Link>
      <div className="w-full mt-[20px] grid grid-cols-[2fr_1fr] gap-[40px]">
        <div className="w-full flex flex-col overflow-hidden">
          <Carousel>
            <CarouselContent className="mx-0 w-full z-0 gap-[20px]">
              {cards.map((id) => (
                <PhotoCard key={id} id={id} />
              ))}
              <div
                className="cursor-pointer min-w-[160px] w-[160px] aspect-[1/1.6] opacity-30 shadow-md shadow-black text-center bg-white rounded-lg flex items-center justify-center"
                onClick={addCard}
              >
                <p className="text-sm underline text-black/50 text-center">добавить карту в набор</p>
              </div>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <p className="text-black/50 text-center">1 из {cards.length} изображений добавлено</p>
          <div className="w-full grid grid-cols-2 gap-[20px]">
            <div className="w-full flex flex-col">
              <p className="underline text-xl">НАЗВАНИЕ НАБОРА</p>
              <input
                className="w-full bg-white outline-none rounded-lg py-[10px] px-[15px] mt-[10px]"
                placeholder="введите название"
                value={name}
                onChange={(e) => changeName(e.target.value)}
              />
              <p className="underline text-xl">ВОЗНАГРАЖДЕНИЕ</p>
              <p className="text-[8px] text-black/50">
                Единоразовое вознаграждение если набор предусматривает вознаграждение за сбор набора
              </p>
              <input
                className="w-full bg-white outline-none rounded-lg py-[10px] px-[15px] mt-[10px]"
                placeholder="сумму вознаграждения если нет введите -"
                value={reward == 0 ? '' : reward.toString()}
                onChange={(e) =>
                  changeReward(e.target.value == '' ? 0 : isNaN(parseInt(e.target.value)) ? reward : parseInt(e.target.value))
                }
              />
              <p className="underline text-xl">ОПЫТ</p>
              <p className="text-[8px] text-black/50">
                Единоразовое начисление опыта, если набор предусматривает вознаграждение опытом за получение
              </p>
              <input
                className="w-full bg-white outline-none rounded-lg py-[10px] px-[15px] mt-[10px]"
                placeholder="введите количество опыта... если нет введите -"
                value={exp == 0 ? '' : exp.toString()}
                onChange={(e) =>
                  changeExp(e.target.value == '' ? 0 : isNaN(parseInt(e.target.value)) ? exp : parseInt(e.target.value))
                }
              />
            </div>
            <div className="w-full flex flex-col">
              <p className="underline text-xl">ВОЗНАГРАЖДЕНИЕ КАРТОЙ</p>
              <p className="text-[8px] text-black/50">
                Единоразовое вознаграждение картой если набор предусматривает вознаграждение эксклюзивной картой за получение
                набора. Если вознаграждения нет, выберите НЕТ
              </p>
              <Select>
                <SelectTrigger className="w-full bg-white outline-none rounded-lg py-[10px] px-[15px] mt-[10px]">
                  <SelectValue placeholder="введите название карты" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first">Первая карта</SelectItem>
                  <SelectItem value="second">Вторая карта</SelectItem>
                  <SelectItem value="no">НЕТ</SelectItem>
                </SelectContent>
              </Select>
              <p className="underline text-xl">ВОЗНАГРАЖДЕНИЕ В ЧАС</p>
              <p className="text-[8px] text-black/50">
                Единоразовое вознаграждение в час, если набор предусматривает ежечасное вознаграждение за получение
              </p>
              <input
                className="w-full bg-white outline-none rounded-lg py-[10px] px-[15px] mt-[5px]"
                placeholder="вознаграждения если нет введите -"
                value={hourly == 0 ? '' : hourly.toString()}
                onChange={(e) =>
                  changeHourly(e.target.value == '' ? 0 : isNaN(parseInt(e.target.value)) ? hourly : parseInt(e.target.value))
                }
              />
              <p className="underline text-lg">КРИТЕРИИ ОТКРЫТИЯ НАБОРА ДЛЯ ПОЛЬЗОВАТЕЛЕЙ</p>
              <p className="text-[8px] text-black/50">
                Критерии по которым открывается набор для пользователей, количество друзей, уровень города
              </p>
              <div className="w-full grid grid-cols-2 gap-[10px]">
                <div className="w-full flex flex-col items-center gap-[3px]">
                  <input
                    className="w-full bg-white outline-none rounded-lg py-[10px] px-[15px] mt-[10px]"
                    placeholder="введите кол-во"
                    value={friends == 0 ? '' : friends.toString()}
                    onChange={(e) =>
                      changeFriends(
                        e.target.value == '' ? 0 : isNaN(parseInt(e.target.value)) ? friends : parseInt(e.target.value),
                      )
                    }
                  />
                  <p className="text-[9px]">введите количество друзей от уровня которых откроется нао0р для пользователя</p>
                </div>
                <div className="w-full flex flex-col items-center gap-[3px]">
                  <input
                    className="w-full bg-white outline-none rounded-lg py-[10px] px-[15px] mt-[10px]"
                    placeholder="введите уровень"
                    value={levels == 0 ? '' : levels.toString()}
                    onChange={(e) =>
                      changeLevels(e.target.value == '' ? 0 : isNaN(parseInt(e.target.value)) ? levels : parseInt(e.target.value))
                    }
                  />
                  <p className="text-[9px]">введите количество уровень с которого откроется наоор для пользователя</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col">
          <p className="text-xl underline">ОПИСАНИЕ НАБОРА</p>
          <textarea
            className="bg-white resize-none  rounded-lg outline-none px-[15px] py-[10px] min-h-[100px] mt-[10px]"
            placeholder="введите текст"
            value={description}
            onChange={(e) => changeDescription(e.target.value)}
          />
          <div className="w-full grid grid-cols-2 gap-[10px] mt-[30px]">
            <div className="flex underline text-xl flex-col gap-[10px]">
              <div className="w-full flex justify-between items-center">
                <p>Жители</p>
                <input type="radio" name="type" checked={type == 'city'} onChange={() => changeType('city')} />
              </div>
              <div className="w-full flex justify-between items-center">
                <p>Город</p>
                <input type="radio" name="type" checked={type == 'resident'} onChange={() => changeType('resident')} />
              </div>
            </div>
            <p className="text-xs text-black/50">выберите к какому разделу относится набор</p>
          </div>
          <p className="text-xl underline mt-[15px]">АКТИВАЦИЯ НАБОРА</p>
          <div className="w-full grid grid-cols-2 gap-[10px] mt-[30px]">
            <div className="flex underline text-xl flex-col gap-[10px]">
              <div className="w-full flex justify-between items-center">
                <p>Вкл</p>
                <input type="radio" name="activation" checked={activation} onChange={() => changeActivation(true)} />
              </div>
              <div className="w-full flex justify-between items-center">
                <p>Выкл</p>
                <input type="radio" name="activation" checked={!activation} onChange={() => changeActivation(false)} />
              </div>
            </div>
            <p className="text-xs text-black/50">
              Активируйте набор. После активации набор появиться пользователи смогут начать соор набора.
            </p>
          </div>
          <p className="text-xl underline mt-[20px]">ПОМЕТКИ ДЛЯ АДМИНИСТРАТОРА</p>
          <textarea
            className="bg-white resize-none  rounded-lg outline-none px-[15px] py-[10px] min-h-[100px] mt-[10px]"
            placeholder="введите текст"
            value={notes}
            onChange={(e) => changeNotes(e.target.value)}
          />
          <button className="max-w-max px-[10px] py-[5px] bg-green rounded-lg text-lg text-white self-end mt-[10px]">
            РЕДАКТИРОВАТЬ/СОХРАНИТЬ
          </button>
        </div>
      </div>
    </div>
  )
}
