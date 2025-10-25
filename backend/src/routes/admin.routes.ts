import express  from "express";
import { getAllUsers } from "../controllers/admin.controller";
import { toggleUserStatus } from "../controllers/admin.controller";

const router = express.Router()

router.get("/admin/users",getAllUsers)

router.patch("/admin/users/:userId/toggle-status",toggleUserStatus)

export default router