import { homeRoute } from '@/shared/routes'
import { Link } from 'atomic-router-react'

export function Header() {
  const name = 'Ivan Admin' // admin name
  const signOut = () => {
    // sign out logic
  }
  return (
    <header className="w-full flex items-center px-[60px] py-[20px] bg-green justify-between">
      <Link to={homeRoute} className="text-white text-xl">
        ADMIN PANEL
      </Link>
      <div className="flex items-center gap-[20px]">
        <p className="text-white text-lg">Hello: {name}</p>
        <button className="uppercase bg-white rounded-md shadow-md px-[10px] py-[3px] shadow-black" onClick={signOut}>
          ВЫХОД
        </button>
      </div>
    </header>
  )
}
