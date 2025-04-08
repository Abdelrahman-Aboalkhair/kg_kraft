import express from "express";
import OrderController from "../controllers/orderController";
import OrderService from "../services/orderService";
import OrderRepository from "../repositories/orderRepository";
import protect from "../middlewares/protect";
import { validateDto } from "../middlewares/validateDto";
import { UpdateTrackingStatusDto } from "../dtos/orderDto";

const router = express.Router();
const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository);
const orderController = new OrderController(orderService);

router.get("/", protect, orderController.getUserOrders);
router.get("/:orderId", protect, orderController.getOrderDetails);
router.patch(
  "/:orderId/tracking",
  protect,
  validateDto(UpdateTrackingStatusDto),
  orderController.updateTrackingStatus
);

export default router;
