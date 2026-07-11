import { Router } from 'express'
import { getStats } from '../controllers/admin.controller.js'
import { protect, adminOnly } from '../middleware/auth.middleware.js'

const router = Router()
router.get('/stats', protect, adminOnly, getStats)
export default router