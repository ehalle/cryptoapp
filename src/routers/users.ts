import { Router } from "express";
import { addSymbol, dashboard } from "../controllers/users/controller";

const router = Router();

export default router;

router.get('/dashboard', dashboard);
router.post('/symbols/add', addSymbol);