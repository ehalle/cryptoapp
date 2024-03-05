import { Router } from "express";
import { dashboard } from "../controllers/users/controller";

const router = Router();

export default router;

router.get('/dashboard', dashboard);