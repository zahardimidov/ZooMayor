import { editBonusRoute } from '@/shared/routes'
import { Link } from 'atomic-router-react'
import { useUnit } from 'effector-react'
import { $internalBonuses } from '../model'
import { BonusCard } from './card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion'

export function InternalBonusDashboard() {
  const allBonuses = useUnit($internalBonuses)

  return (
    <div className="w-full rounded-lg bg-grey px-[50px] py-[20px]">
      <Accordion type="single" collapsible>
        <AccordionItem value="internal" className="border-b-0">
          <AccordionTrigger className="w-full grid grid-cols-2 justify-between gap-[30px]">
            <div className="w-[300px] flex flex-col gap-[5px]">
              <p className="text-lg underline">ВНУТРЕННИЕ БОНУСЫ</p>
              <p className="text-xs">бонусы внутри игры/акции/подарки/промо/ от разработчика</p>
            </div>
            <Link
              to={editBonusRoute}
              params={{ id: 'new' }}
              className="bg-green rounded-lg px-[10px] py-[6px] text-white underline text-xl max-w-max"
            >
              + ДОБАВИТЬ БОНУС
            </Link>
          </AccordionTrigger>
          <AccordionContent className="w-full flex flex-col gap-[20px]">
            {allBonuses.map((bonus) => (
              <BonusCard key={bonus.id} bonus={bonus} />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
