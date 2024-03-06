import { Router } from "express";
import { addSymbol, dashboard, login } from "../controllers/users/controller";
import validate from "../middlewares/input-validation";
import { addSymbolValidator } from "../controllers/users/validator";

const router = Router();

export default router;

router.get('/dashboard', dashboard);
router.get('/login', login);
router.post('/symbols/add', validate(addSymbolValidator), addSymbol);