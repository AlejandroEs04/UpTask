import { Router } from "express"
import { body, param } from 'express-validator'
import { ProjectController } from "../controllers/ProjectController"
import { handleInputErrors } from "../middleware/validation"

const router = Router()

router.post('/', 
    body('projectName')
        .notEmpty().withMessage("Project name is required"),
    body('clientName')
        .notEmpty().withMessage("Client name is required"),
    body('description')
        .notEmpty().withMessage("Description is required"),
    handleInputErrors,
    ProjectController.createProjects
)
router.get('/', ProjectController.getAllProjects)

router.get('/:id', 
    param('id').isMongoId().withMessage("ID no válido"), 
    handleInputErrors,
    ProjectController.getProjectById
)

router.put('/:id', 
    param('id').isMongoId().withMessage("ID no válido"), 
    body('projectName')
        .notEmpty().withMessage("Project name is required"),
    body('clientName')
        .notEmpty().withMessage("Client name is required"),
    body('description')
        .notEmpty().withMessage("Description is required"),
    handleInputErrors,
    ProjectController.updateProject
)

export default router