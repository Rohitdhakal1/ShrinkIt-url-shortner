import express from "express";
import url from "../models/url";
import { redirectUrl } from "../controllers/urlContainer";

const route = express.Router();

route.get('/:code',redirectUrl);

export default route;


