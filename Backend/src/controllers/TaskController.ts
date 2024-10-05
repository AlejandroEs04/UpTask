import type { Request, Response } from 'express'
import Task from '../models/Task'

export class TaskController {
    static createTask = async(req: Request, res: Response) : Promise<void> => {
        try {
            const task = new Task(req.body)
            task.project = req.project.id
            req.project.tasks.push(task.id)

            // Let execute two or more actions in await where this actions don´t depends from each other
            await Promise.allSettled([task.save(), req.project.save()])

            res.send('Task created successfully')
        } catch (error) {
            res.status(500).json({ error: 'Was there an error' })
        }
    }

    static getProjectTask = async(req: Request, res: Response) : Promise<void> => {
        try {
            const tasks = await Task.find({ project: req.project.id })
                .populate('project')

            res.json(tasks)
        } catch (error) {
            res.status(500).json({ error: 'Was there an error' })
        }
    }

    static getTaskById = async(req: Request, res: Response) : Promise<void> => {
        try {
            res.json(req.task)
        } catch (error) {
            res.status(500).json({ error: 'Was there an error' })
        }
    }
    
    static updateTask = async(req: Request, res: Response) : Promise<void> => {
        try {
            req.task.name = req.body.name
            req.task.description = req.body.description

            await req.task.save()

            res.send('Task updated successfully')
        } catch (error) {
            res.status(500).json({ error: 'Was there an error' })
        }
    }

    static deleteTask = async(req: Request, res: Response) : Promise<void> => {
        try {
            req.project.tasks = req.project.tasks.filter(task => task.toString() !== req.task.id.toString())

            await Promise.allSettled([req.task.deleteOne(), req.project.save()])

            res.send('Task deleted successfully')
        } catch (error) {
            res.status(500).json({ error: 'Was there an error' })
        }
    }

    static updateStatus = async(req: Request, res: Response) : Promise<void> => {
        try {
            const { status } = req.body
            req.task.status = status

            await req.task.save()

            res.send('Status udpdated successfully')
        } catch (error) {
            res.status(500).json({ error: 'Was there an error' })
        }
    }
}