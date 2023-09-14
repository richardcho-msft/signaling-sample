import Express from "express";
import { createCallController } from "./controllers/outboundCallControllers";
import { callbackEventController } from "./controllers/eventControllers";

const router = Express.Router();

router.post("/createCall", createCallController);
router.post("/notifications", callbackEventController);

export default router;