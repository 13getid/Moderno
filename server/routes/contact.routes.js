import { Router } from 'express'
import { sendContact } from '../controllers/contact.controller.js'

const router = Router()

// Public — anyone can send a contact message (no login required)
router.post('/', sendContact)

export default router