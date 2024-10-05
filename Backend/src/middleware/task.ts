import type { Request, Response, NextFunction } from 'express'
import Task, { ITask } from '../models/Task'

declare global {
    namespace Express {
        interface Request {
            task: ITask
        }
    }
}

export async function taskExists(req:Request, res: Response, next: NextFunction) {
    const { taskId } = req.params

    try {
        const task = await Task.findById(taskId)

        if(!task) {
            const error = new Error('Task not found')
            res.status(404).json({error: error.message})
            return
        }

        req.task = task

        next()
    } catch (error) {
        res.status(500).json({ error: 'Was there some error' })
    }
}

export function taskBelongsToProject (req:Request, res: Response, next: NextFunction) {
    if(req.task.project.toString() !== req.project.id.toString()) {
        const error = new Error("Invalid action")
        res.status(400).json({ error: error.message })
        return
    }
    next()
}