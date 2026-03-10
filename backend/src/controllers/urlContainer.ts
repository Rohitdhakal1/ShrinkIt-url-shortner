import { Request, Response, NextFunction } from "express";
import { UrlService } from "../services/url.service";

export const shortenUrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { longUrl } = req.body;
        
        if (!longUrl) {
            return res.status(400).json({ success: false, message: "longUrl is required" });
        }

        const url = await UrlService.shortenUrl(longUrl);
        res.json(url);

    } catch (error) {
        next(error);
    }
};

export const redirectUrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { code } = req.params;
        
        if (!code) {
           return res.status(400).json({ success: false, message: "URL code is required" });
        }

        const longUrl = await UrlService.getLongUrlByCode(code);
        return res.redirect(longUrl);

    } catch (error) {
        next(error);
    }
};

export const getUrlStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { code } = req.params;
        
        if (!code) {
           return res.status(400).json({ success: false, message: "URL code is required" });
        }

        const urlStats = await UrlService.getUrlStatsByCode(code);
        res.json(urlStats);

    } catch (error) {
        next(error);
    }
};
