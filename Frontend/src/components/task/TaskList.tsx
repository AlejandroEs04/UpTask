import { Task } from "@/types/index"

type TaskListProps = {
    tasks: Task[]
}

export default function TaskList({ tasks } : TaskListProps) {
    console.log(tasks)

    return (
        <div>TaskList</div>
    )
}
