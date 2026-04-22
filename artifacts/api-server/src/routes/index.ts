import { Router, type IRouter } from "express";
import healthRouter from "./health";
import caregiversRouter from "./caregivers";
import reviewsRouter from "./reviews";
import bookingsRouter from "./bookings";
import chatRouter from "./chat";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(caregiversRouter);
router.use(reviewsRouter);
router.use(bookingsRouter);
router.use(chatRouter);
router.use(statsRouter);

export default router;
