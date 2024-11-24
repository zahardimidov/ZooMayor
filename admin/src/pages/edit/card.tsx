import { editCardRoute, goCardsRoute } from '@/shared/routes'
import { EditCard, resetEditCard } from '@/features/edit-card'
import { Header } from '@/widgets/header'
import { useUnit } from 'effector-react'
import { useEffect } from 'react'

export function EditCardPage() {
  const { id } = useUnit(editCardRoute.$params)
  const goCards = useUnit(goCardsRoute)
  const reset = useUnit(resetEditCard)
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
        <EditCard />
      </main>
    </>
  )
}
