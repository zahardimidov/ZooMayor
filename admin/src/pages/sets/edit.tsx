import { editSetRoute, goCardsRoute } from '@/shared/routes'
import { EditSet, resetEditSet } from '@/features/edit-set'
import { Header } from '@/widgets/header'
import { useUnit } from 'effector-react'
import { useEffect } from 'react'

export function EditSetPage() {
  const { id } = useUnit(editSetRoute.$params)
  const goCards = useUnit(goCardsRoute)
  const reset = useUnit(resetEditSet)
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
        <EditSet />
      </main>
    </>
  )
}
