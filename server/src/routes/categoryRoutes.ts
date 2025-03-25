import express from "express";
import * as categoryController from "../controllers/categoryController";
import protect from "../middlewares/protect";
import authorizeRole from "../middlewares/authorizeRole";
import { validateCreateCategory } from "../validation/categoryValidation";

const router = express.Router();

router.get("/", categoryController.getAllCategories);
router.post(
  "/",
  protect,
  authorizeRole("admin", "superadmin"),
  validateCreateCategory,
  categoryController.createCategory
);
router.delete(
  "/:id",
  protect,
  authorizeRole("admin", "superadmin"),
  categoryController.deleteCategory
);

export default router;
