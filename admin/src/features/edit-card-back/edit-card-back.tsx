import { cardsRoute } from '@/shared/routes'
import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'
import {
  $descripition,
  $experience,
  $expReward,
  $friendsCount,
  $hasRequirements,
  $levelsCount,
  $name,
  $notes,
  $price,
  $rating,
  descriptionChanged,
  experienceChanged,
  expRewardChanged,
  friendsCountChanged,
  hasRequirementsChanged,
  levelsCountChanged,
  nameChanged,
  notesChanged,
  priceChanged,
  ratingChanged,
} from './model'
import { useState } from 'react'
import Swal from 'sweetalert2'

export function EditCardBack() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [name, changeName] = useUnit([$name, nameChanged])
  const [price, changePrice] = useUnit([$price, priceChanged])
  const [expReward, changeExpReward] = useUnit([$expReward, expRewardChanged])
  const [experience, changeExperience] = useUnit([$experience, experienceChanged])
  const [hasRequirements, changeHasRequirements] = useUnit([$hasRequirements, hasRequirementsChanged])
  const [friendsCount, changeFriendsCount] = useUnit([$friendsCount, friendsCountChanged])
  const [levelsCount, changeLevelsCount] = useUnit([$levelsCount, levelsCountChanged])
  const [description, changeDescription] = useUnit([$descripition, descriptionChanged])
  const [rating, changeRating] = useUnit([$rating, ratingChanged])
  const [notes, changeNotes] = useUnit([$notes, notesChanged])

  function postData() {
    var formData = new FormData()

    if (selectedImage){
      formData.append('photo', selectedImage);
    }

    const data = {
      title: name.toString(),
      price: price.toString(),
      exp: experience.toString(),
      min_level: levelsCount.toString(),
      min_friends_amount: friendsCount.toString(),
      rating: rating.toString(),
      description: description.toString(),
      note: notes.toString()
    };

    const params = new URLSearchParams(data).toString();


    fetch(`http://0.0.0.0:4550/admin/create_cardback?${params}`, {
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
      <p className="underline text-xl max-w-[300px]">РУБАШКИ КАРТ/РЕДАКТИРОВАНИЕ/СОЗДАНИЕ</p>
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
        <div className="max-w-[500px] w-[25dvw] flex flex-col">
          <p className="underline text-xl">НАЗВАНИЕ РУБАШКИ</p>
          <input
            className="w-full bg-white outline-none rounded-lg py-[10px] px-[15px] mt-[10px]"
            placeholder="введите название"
            value={name}
            onChange={(e) => changeName(e.target.value)}
          />
          <p className="underline text-xl mt-[10px]">СТОИМОСТЬ ПОКУПКИ В МАГАЗИНЕ</p>
          <input
            className="w-full bg-white outline-none rounded-lg py-[10px] px-[15px] mt-[10px]"
            placeholder="введите сумму"
            value={price == 0 ? '' : price.toString()}
            onChange={(e) =>
              changePrice(e.target.value == '' ? 0 : isNaN(parseInt(e.target.value)) ? price : parseInt(e.target.value))
            }
          />
          <div className="w-full flex items-center justify-between">
            <p className="underline text-xl mt-[10px]">ОПЫТ</p>
            <div className="flex items-center gap-[5px]">
              <p className="text-black/50 text-sm">вкл/выкл</p>
              <input
                type="checkbox"
                className="accent-green"
                checked={expReward}
                onChange={(e) => changeExpReward(e.target.checked)}
                unselectable="on"
              />
            </div>
          </div>
          <p className="uppercase text-[8px]">
            (Единоразовое начисление опыта, если рубашка предусматривает вознаграждение опытом за получение рубашки)
          </p>
          <input
            className="w-full bg-white outline-none rounded-lg py-[10px] px-[15px] mt-[10px]"
            placeholder="введите количество опыта"
            disabled={!expReward}
            value={experience == 0 ? '' : experience.toString()}
            onChange={(e) =>
              changeExperience(e.target.value == '' ? 0 : isNaN(parseInt(e.target.value)) ? experience : parseInt(e.target.value))
            }
          />
          <div className="w-full flex items-center justify-between">
            <p className="underline text-xl mt-[10px]">КРИТЕРИИ ОТКРЫТИЯ РУБАШКИ ДЛЯ ПОЛЬЗОВАТЕЛЕЙ</p>
            <div className="flex items-center gap-[5px]">
              <p className="text-black/50 text-sm min-w-max">вкл/выкл</p>
              <input
                type="checkbox"
                className="accent-green"
                checked={hasRequirements}
                onChange={(e) => changeHasRequirements(e.target.checked)}
              />
            </div>
          </div>
          <p className="uppercase text-[8px]">
            критерии по которым открывается НАБОР ДЛЯ ПОЛЬЗОВАТЕЛЕЙ, КОЛИЧЕСТВО приглашенных друзей, уровень города
          </p>
          <div className="w-full grid grid-cols-2 gap-[10px]">
            <div className="w-full flex flex-col justify-center gap-[10px]">
              <input
                className="w-full bg-white outline-none rounded-lg py-[10px] px-[15px] mt-[10px]"
                placeholder="введите кол-во"
                disabled={!hasRequirements}
                value={friendsCount == 0 ? '' : friendsCount.toString()}
                onChange={(e) =>
                  changeFriendsCount(
                    e.target.value == '' ? 0 : isNaN(parseInt(e.target.value)) ? friendsCount : parseInt(e.target.value),
                  )
                }
              />
              <p className="text-black/50 text-xs">
                введите количество друзей от уровня которых откроется набор для пользователя
              </p>
            </div>
            <div className="w-full flex flex-col justify-center gap-[10px]">
              <input
                className="w-full bg-white outline-none rounded-lg py-[10px] px-[15px] mt-[10px]"
                placeholder="введите уровень"
                disabled={!hasRequirements}
                value={levelsCount == 0 ? '' : levelsCount.toString()}
                onChange={(e) =>
                  changeLevelsCount(
                    e.target.value == '' ? 0 : isNaN(parseInt(e.target.value)) ? levelsCount : parseInt(e.target.value),
                  )
                }
              />
              <p className="text-black/50 text-xs">введите уровень с которого откроется набор для пользователя</p>
            </div>
          </div>
          <p className="text-[8px] text-black/50 self-center text-center mt-[10px] max-w-[200px]">
            если выключено, то получить рубашку можно только купив ее в магазине или с помощью инвайт-кода
          </p>
        </div>
        <div className="max-w-full w-[20dvw] flex flex-col">
          <p className="text-xl underline">ОПИСАНИЕ РУБАШКИ</p>
          <textarea
            className="bg-white resize-none  rounded-lg outline-none px-[15px] py-[10px] min-h-[100px] mt-[10px]"
            placeholder="введите текст"
            value={description}
            onChange={(e) => changeDescription(e.target.value)}
          />
          <div className="w-full flex items-center gap-[4px] justify-between">
            <p className="text-xl underline max-w-[100px]">Рейтинг рубашки</p>
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
              Определяет ценность рубашки. Введите число от 0 до 100, где 0 означает, что рубашка не имеет ценности, а 100
              означает, что рубашка крайне редкая.
            </p>
          </div>
          <p className="text-xl underline">ПОМЕТКИ ДЛЯ АДМИНИСТРАТОРА</p>
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
