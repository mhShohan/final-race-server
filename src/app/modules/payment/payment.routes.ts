import { Router } from 'express'
import paymentControllers from './payment.controllers'

const paymentRoutes = Router()

paymentRoutes.post('/', paymentControllers.create)
paymentRoutes.get('/:id', paymentControllers.getSingle)
paymentRoutes.get('/', paymentControllers.getAll)


export default paymentRoutes