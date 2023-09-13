import Express from "express";
import { createCallController } from "./controllers/outboundCallControllers";

const router = Express.Router();

router.post("/createCall", createCallController);

export default router;