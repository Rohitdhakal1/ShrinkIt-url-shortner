import validUrl from "valid-url";
import shortid from "shortid";
import Url from "../models/url";
import redisClient from "../config/redis";
import { APIError } from "../utils/apiError";

export class UrlService {
  static async shortenUrl(longUrl: string): Promise<any> {
    let formattedLongUrl = longUrl.trim();
    if (!/^https?:\/\//i.test(formattedLongUrl)) {
      formattedLongUrl = "https://" + formattedLongUrl;
    }

    const baseUrl = process.env.BASE_URL;

    if (!validUrl.isUri(formattedLongUrl)) {
      throw new APIError(401, "invalid long Url");
    }

    if (!validUrl.isUri(baseUrl as string)) {
      throw new APIError(500, "invalid base url");
    }

    let url = await Url.findOne({ longUrl: formattedLongUrl });
    if (url) return url;

    const urlCode = shortid.generate();
    const shortUrl = `${baseUrl}/${urlCode}`;

    url = new Url({
      longUrl: formattedLongUrl,
      shortUrl,
      urlCode,
      date: new Date(),
    });
    await url.save();

    return url;
  }

  static async getLongUrlByCode(code: string): Promise<string> {
    if (!code) {
      throw new APIError(400, "Invalid code");
    }

    // 1. Try to get destination from fast cache first
    const cachedLongUrl = await redisClient.get(code);

    // 2. Regardless of cache hit/miss, we MUST increment clicks in MongoDB
    const url = await Url.findOneAndUpdate(
      { urlCode: code },
      { $inc: { clicks: 1 } },
      { returnDocument: "after" },
    );

    if (!url && !cachedLongUrl) {
      throw new APIError(404, "No URL Found");
    }

    // 3. If it wasn't in cache, put it there for next time
    if (!cachedLongUrl && url) {
      const TTL = 3600;
      await redisClient.set(code, url.longUrl, "EX", TTL);
      return url.longUrl;
    }

    return cachedLongUrl as string;
  }

  static async getUrlStatsByCode(code: string): Promise<any> {
    if (!code) {
      throw new APIError(400, "Invalid code");
    }

    const url = await Url.findOne({ urlCode: code });

    if (!url) {
      throw new APIError(404, "No URL Found");
    }

    return url;
  }
}
