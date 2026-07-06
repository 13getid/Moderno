import { Router } from 'express'
import { createOrder, getMyOrders, getAllOrders, updateStatus }
  from '../controllers/order.controller.js'
import { protect, adminOnly } from '../middleware/auth.middleware.js'

const router = Router()
router.post('/',           protect,            createOrder)
router.get('/my',         protect,            getMyOrders)
router.get('/',           protect, adminOnly, getAllOrders)
router.put('/:id/status', protect, adminOnly, updateStatus)
export default router