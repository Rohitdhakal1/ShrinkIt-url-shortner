import express  from "express";
import { shortenUrl, getUrlStats } from "../controllers/urlContainer";

const route= express.Router();

route.post('/shorten',shortenUrl);
route.get('/stats/:code', getUrlStats);
export default route;