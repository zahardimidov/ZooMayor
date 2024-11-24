import { RouteInstance, RouteParams } from 'atomic-router'
import { Link } from 'atomic-router-react'

export function LinkCard<P extends RouteParams>({
  to,
  heading,
  icon,
  params,
}: {
  to: RouteInstance<P>
  heading: string
  icon: React.ReactNode
  params?: P
}) {
  return (
    <Link
      to={to}
      params={params}
      className="bg-green rounded-lg text-white py-[20px] gap-[20px] px-[30px] w-full flex flex-col items-center shadow-black shadow-xl"
    >
      <p className="underline text-center text-xl">{heading}</p>
      <div className="w-[200px] h-[150px] flex items-center justify-center">{icon}</div>
    </Link>
  )
}
