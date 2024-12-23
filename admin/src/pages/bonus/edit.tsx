import { EditBonus, resetEditBonus } from '@/features/edit-bonus'
import { editBonusRoute, goBonusRoute } from '@/shared/routes'
import { Header } from '@/widgets/header'
import { useUnit } from 'effector-react'
import { useEffect } from 'react'

export function EditBonusPage() {
  const { id } = useUnit(editBonusRoute.$params)
  const goBonus = useUnit(goBonusRoute)
  const reset = useUnit(resetEditBonus)
  useEffect(() => {
    reset()
    if (id != 'new' && isNaN(parseInt(id))) {
      goBonus()
    }
  }, [id, goBonus, reset])
  return (
    <>
      <Header />
      <main className="w-full bg-white px-[40px] py-[20px]">
        <EditBonus />
      </main>
    </>
  )
}
