import { Navigate, useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProjectById } from "@/api/ProjectApi"
import AddTaskModal from "@/components/task/AddTaskModal"
import TaskList from "@/components/task/TaskList"

export default function ProjectDetailsView() {
    const params = useParams()
    const projectId = params.projectId!

    const navigate = useNavigate()

    const { data, isLoading, isError } = useQuery({
        queryKey: ['editProject', projectId], 
        queryFn: () => getProjectById(projectId), 
        retry: false
    })

    if(isLoading) return 'Cargando...'

    if(isError) return <Navigate to={'/404'} />

    if(data) return (
        <>
            <h1 className="text-5xl font-black">{data.projectName}</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>

            <nav className="my-5 flex gap-3">
                <button 
                    type="button" 
                    onClick={() => navigate(location.pathname + '?newTask=true')}
                    className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                >Agregar Tarea</button>
            </nav>

            <TaskList 
                tasks={data.tasks}
            />

            <AddTaskModal />
        </>
    )
}