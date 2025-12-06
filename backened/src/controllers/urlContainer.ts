import { Request,Response } from "express";
import validUrl from "valid-url";
import shortid from "shortid";
import Url from "../models/url";
import redisClient from "../config/redis";


export const shortenUrl = async(req:Request,res:Response)=>{
    let {longUrl} = req.body;

    longUrl = longUrl.trim();
    // fi bug iif user direct url without https we added ourself 
    if (!/^https?:\/\//i.test(longUrl)) {
        longUrl = 'https://' + longUrl;
    }

    const baseUrl = process.env.BASE_URL;

    if(!validUrl.isUri(longUrl)){
        return res.status(401).json("invalid long Url");
    }

    if(!validUrl.isUri(baseUrl as string)){
        return res.status(401).json("invalid base url");
    }

    try {
        let url = await Url.findOne({ longUrl });
        if(url) return res.json(url);

        const urlCode = shortid.generate();
        const shortUrl = baseUrl+'/'+urlCode;
        
        url = new Url({longUrl,shortUrl,urlCode,date:new Date()});
        await url.save();
        res.json(url);

    } catch (error) {
        console.error(error);
        res.status(500).json('Server Error');
    }
};

export const redirectUrl = async (req: Request, res: Response) => {
    try {
        const { code } = req.params;
         if (!code) {
            return res.status(400).json('Invalid code');
        }

        
        // if code present and why not just fetch the shorturl fromm redis and drop it on client 
        // it helps and make the url faster to redirect 
        // Redis client returns strings or null/undefined
        const cachedLongUrl = await redisClient.get(code);
        if (cachedLongUrl) {
            // CACHE HIT: Respond instantly (5ms response time!)
            // We use 302 redirect for temporary move, which is standard for shorteners.
            return res.redirect(cachedLongUrl); 
        }

        const url = await Url.findOne({ urlCode: code });

        if (url) {
            url.clicks++;
            await url.save();

            const TTL = 3600; // Time To Live: 1 hour (3600 seconds) // it just need how we want 
            await redisClient.set(code, url.longUrl, 'EX', TTL);

            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json('No URL Found');
        }

    } catch (err) {
        console.error(err);
        console.error("Redis/MongoDB Redirect Error:", err);
        res.status(500).json('Server Error');
    }
};
