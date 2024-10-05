import { Link } from "react-router-dom"

export default function DashboardView() {
  return (
    <>
        <h1 className="text-5xl font-black">Mis proyectos</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">Maneja y administra tus proyectos</p>
        
        <nav className="my-5">
            <Link
                to={'/projects/create'}
                className="bg-purple-400 hover:bg-purple-500 px-8 py-2 text-white text-lg font-bold cursor-pointer transition-colors"
            >Nuevo Proyecto</Link>
        </nav>
    </>
  )
}
