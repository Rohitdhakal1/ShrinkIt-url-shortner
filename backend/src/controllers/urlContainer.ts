import { Request, Response, NextFunction } from "express";
import { UrlService } from "../services/url.service";

export const shortenUrl = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { longUrl } = req.body;

    if (typeof longUrl !== "string" || !longUrl.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "longUrl is required" });
    }

    const url = await UrlService.shortenUrl(longUrl);
    res.json(url);
  } catch (error) {
    next(error);
  }
};

export const redirectUrl = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const code = req.params.code;

    if (!code || Array.isArray(code)) {
      return res
        .status(400)
        .json({ success: false, message: "URL code is required" });
    }

    const longUrl = await UrlService.getLongUrlByCode(code);

    if (!/^https?:\/\//i.test(longUrl)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid redirect URL" });
    }

    return res.redirect(301, longUrl);
  } catch (error) {
    next(error);
  }
};

export const getUrlStats = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const code = req.params.code;

    if (!code || Array.isArray(code)) {
      return res
        .status(400)
        .json({ success: false, message: "URL code is required" });
    }

    const urlStats = await UrlService.getUrlStatsByCode(code);
    res.json(urlStats);
  } catch (error) {
    next(error);
  }
};
