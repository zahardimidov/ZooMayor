import { cardsRoute } from '@/shared/routes'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select'
import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'
import { useState } from 'react'
import {
  $chance,
  $description,
  $exp,
  $hasExp,
  $hasHourly,
  $hourly,
  $name,
  $notes,
  $rating,
  $reward,
  $type,
  chanceChanged,
  descriptionChanged,
  expChanged,
  hasExpChanged,
  hasHourlyChanged,
  hourlyChanged,
  nameChanged,
  notesChanged,
  ratingChanged,
  rewardChanged,
  typeChanged,
} from './model'
import Swal from 'sweetalert2'

export function EditCard() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [name, changeName] = useUnit([$name, nameChanged])
  const [reward, changeReward] = useUnit([$reward, rewardChanged])
  const [hasExp, changeHasExp] = useUnit([$hasExp, hasExpChanged])
  const [exp, changeExp] = useUnit([$exp, expChanged])
  const [hasHourly, changeHasHourly] = useUnit([$hasHourly, hasHourlyChanged])
  const [hourly, changeHourly] = useUnit([$hourly, hourlyChanged])
  const [chance, changeChance] = useUnit([$chance, chanceChanged])
  const [description, changeDescription] = useUnit([$description, descriptionChanged])
  const [type, changeType] = useUnit([$type, typeChanged])
  const [rating, changeRating] = useUnit([$rating, ratingChanged])
  const [notes, changeNotes] = useUnit([$notes, notesChanged])

  function postData() {
    var formData = new FormData()

    if (selectedImage){
      formData.append('photo', selectedImage);
    }

    const data = {
      title: name.toString(),
      bonus: reward.toString(),
      exp: exp.toString(),
      bonus_per_hour: hourly.toString(),
      chance: chance.toString(),
      price: '1000',
      description: description.toString(),
      type: type.toString(),
      node: notes.toString(),
      section: 'culture',
      rating: rating.toString()
    };

    const params = new URLSearchParams(data).toString();

    fetch(`http://0.0.0.0:4550/admin/create_card?${params}`, {
      method: 'POST',
      body: formData
    }).then(response => {
      if (response.ok) {
        Swal.fire({
          title: 'Success!',
          text: 'Card saved',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then((result) => {
          console.log(result)
          location.href = 'http://0.0.0.0:5173/cards'
        })

      }
      else{
        var data = response.json();
        console.log(data);
        Swal.fire({
          title: 'Error!',
          text: 'Error',
          icon: 'error',
        })
      }
    })
  }

  return (
    <div className="w-full bg-grey rounded-xl px-[70px] relative py-[20px]">
      <p className="underline text-xl max-w-[300px]">КАРТЫ ЖИТЕЛЕЙ И ГОРОДА/РЕДАКТИРОВАНИЕ/СОЗДАНИЕ</p>
      <Link
        to={cardsRoute}
        className="size-[30px] absolute top-[20px] right-[20px] bg-red items-center justify-center cursor-pointer rounded-md text-white text-xl flex"
      >
        X
      </Link>
      <div className="w-full mt-[50px] flex gap-[40px]">
        <div className="min-w-[400px] overflow-hidden w-[400px] cursor-pointer h-[670px] rounded-lg bg-white shadow-black shadow-md flex justify-center items-center">
          {!selectedImage ? (
            <>
              <input
                className="hidden"
                type="file"
                id="photo"
                onChange={(event) => {
                  if (event.target.files) setSelectedImage(event.target.files[0])
                }}
              />
              <label
                htmlFor="photo"
                className="underline text-center w-full h-full flex items-center justify-center cursor-pointer text-black/50"
              >
                добавьте изображение...
              </label>
            </>
          ) : (
            <img className="w-full h-full" onClick={() => setSelectedImage(null)} src={URL.createObjectURL(selectedImage)} />
          )}
        </div>
        <div className="w-full flex flex-col">
          <p className="underline text-xl">НАЗВАНИЕ КАРТЫ</p>
          <input
            className="w-full bg-white outline-none rounded-lg py-[10px] px-[15px] mt-[10px]"
            placeholder="введите название"
            value={name}
            onChange={(e) => changeName(e.target.value)}
          />
          <p className="underline text-xl mt-[10px]">ВОЗНАГРАЖДЕНИЕ</p>
          <p className="text-[8px] text-black/50">
            Единоразовое вознаграждение, если карта предусматривает вознаграждение за получение
          </p>
          <input
            className="w-full bg-white outline-none rounded-lg py-[10px] px-[15px] mt-[10px]"
            placeholder="введите сумму"
            value={reward == 0 ? '' : reward.toString()}
            onChange={(e) =>
              changeReward(e.target.value == '' ? 0 : isNaN(parseInt(e.target.value)) ? reward : parseInt(e.target.value))
            }
          />
          <div className="w-full flex items-center justify-between">
            <p className="underline text-xl mt-[10px]">ОПЫТ</p>
            <div className="flex items-center gap-[5px]">
              <p className="text-black/50 text-sm">вкл/выкл</p>
              <input className="accent-green" type="checkbox" checked={hasExp} onChange={(e) => changeHasExp(e.target.checked)} />
            </div>
          </div>
          <p className="text-black/50 text-[8px]">
            (Единоразовое начисление опыта, если рубашка предусматривает вознаграждение опытом за получение рубашки)
          </p>
          <input
            className="w-full bg-white outline-none rounded-lg py-[10px] px-[15px] mt-[10px]"
            placeholder="введите количество опыта"
            disabled={!hasExp}
            value={exp == 0 ? '' : exp.toString()}
            onChange={(e) =>
              changeExp(e.target.value == '' ? 0 : isNaN(parseInt(e.target.value)) ? exp : parseInt(e.target.value))
            }
          />
          <div className="w-full flex items-center justify-between">
            <p className="underline text-xl mt-[10px]">ВОЗНАГРАЖДЕНИЕ В ЧАС</p>
            <div className="flex items-center gap-[5px]">
              <p className="text-black/50 text-sm min-w-max">вкл/выкл</p>
              <input
                type="checkbox"
                className="accent-green"
                checked={hasHourly}
                onChange={(e) => changeHasHourly(e.target.checked)}
              />
            </div>
          </div>
          <p className="text-[8px] text-black/50">
            Единоразовое вознаграждение в час, если карта предусматривает ежечасное вознаграждение за получение
          </p>
          <input
            className="w-full bg-white outline-none rounded-lg py-[10px] px-[15px] mt-[10px]"
            placeholder="введите ежечасное вознаграждение"
            disabled={!hasHourly}
            value={hourly == 0 ? '' : hourly.toString()}
            onChange={(e) =>
              changeHourly(e.target.value == '' ? 0 : isNaN(parseInt(e.target.value)) ? hourly : parseInt(e.target.value))
            }
          />
          <p className="text-lg underline">ШАНС ВЫПАДЕНИЯ КАРТЫ</p>
          <p className="text-[8px] text-black/50">
            Шанс выподения карты от 0.00001% до 99%. Шанс влияет на появление карты на игровом поле игрока
          </p>
          <input
            className="w-full bg-white outline-none rounded-lg py-[10px] px-[15px] mt-[10px]"
            placeholder="введите шанс"
            value={chance == 0 ? '' : chance.toString()}
            onChange={(e) =>
              changeChance(e.target.value == '' ? 0 : isNaN(parseInt(e.target.value)) ? chance : parseInt(e.target.value))
            }
          />
        </div>
        <div className="w-full flex flex-col">
          <p className="text-xl underline">ОПИСАНИЕ КАРТЫ</p>
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
                <input type="radio" name="type" checked={type == 'citizen'} onChange={() => changeType('citizen')} />
              </div>
              <div className="w-full flex justify-between items-center">
                <p>Город</p>
                <input type="radio" name="type" checked={type == 'city'} onChange={() => changeType('city')} />
              </div>
            </div>
            <p className="text-xs text-black/50">выберите к какому разделу относится карта</p>
          </div>
          <div className="w-full grid grid-cols-[1fr_1.5fr] my-[10px] gap-[10px]">
            <p className="text-lg underline">Раздел карты</p>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Выберите раздел" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="music">Музыка</SelectItem>
                <SelectItem value="culture">Культура</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full flex items-center gap-[4px] justify-between">
            <p className="text-xl underline max-w-[100px]">Рейтинг карты</p>
            <input
              className="bg-white outline-none rounded-lg p-[4px] w-full max-w-[55px]"
              placeholder="0-100"
              value={rating == 0 ? '' : rating.toString()}
              onChange={(e) =>
                changeRating(
                  e.target.value == ''
                    ? 0
                    : isNaN(parseInt(e.target.value))
                      ? rating
                      : parseInt(e.target.value) < 0
                        ? 0
                        : parseInt(e.target.value) > 100
                          ? 100
                          : parseInt(e.target.value),
                )
              }
            />
            <p className="text-[8px] text-black/50">
              Определяет ценность карты. Введите число от 0 до 100, где 0 означает, что карта не имеет ценности, а 100 означает,
              что карта крайне редкая.
            </p>
          </div>
          <p className="text-xl underline mt-[20px]">ПОМЕТКИ ДЛЯ АДМИНИСТРАТОРА</p>
          <textarea
            className="bg-white resize-none  rounded-lg outline-none px-[15px] py-[10px] min-h-[100px] mt-[10px]"
            placeholder="введите текст"
            value={notes}
            onChange={(e) => changeNotes(e.target.value)}
          />
          <button onClick={postData} className="max-w-max px-[10px] py-[5px] bg-green rounded-lg text-lg text-white self-end mt-[10px]">
            РЕДАКТИРОВАТЬ/СОХРАНИТЬ
          </button>
        </div>
      </div>
    </div>
  )
}
