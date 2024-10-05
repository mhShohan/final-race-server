import { Router } from 'express'
import paymentControllers from './payment.controllers'
import verifyAuth from '../../middlewares/verifyAuth'

const paymentRoutes = Router()

paymentRoutes.use(verifyAuth)

paymentRoutes.post('/', paymentControllers.create)
paymentRoutes.get('/:id', paymentControllers.getSingle)
paymentRoutes.get('/', paymentControllers.getAll)


export default paymentRoutes