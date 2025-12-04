import express  from "express";
import { shortenUrl } from "../controllers/urlContainer";

const route= express.Router();

route.post('/shorten',shortenUrl);
export default route;