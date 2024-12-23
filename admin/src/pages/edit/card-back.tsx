import { editCardBackRoute, goCardsRoute } from '@/shared/routes'
import { EditCardBack, resetEditCardBackFields } from '@/features/edit-card-back'
import { Header } from '@/widgets/header'
import { useUnit } from 'effector-react'
import { useEffect } from 'react'

export function EditCardBackPage() {
  const { id } = useUnit(editCardBackRoute.$params)
  const goCards = useUnit(goCardsRoute)
  const reset = useUnit(resetEditCardBackFields)
  useEffect(() => {
    reset()
    if (id != 'new' && isNaN(parseInt(id))) {
      goCards()
    }
  }, [id, goCards, reset])

  return (
    <>
      <Header />
      <main className="w-full bg-white px-[45px] py-[20px]">
        <EditCardBack />
      </main>
    </>
  )
}
