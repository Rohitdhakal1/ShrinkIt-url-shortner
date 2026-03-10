import client from "../helpers/axiosConfig";
import axios from "axios";

export interface ShortenResponse {
    shortUrl: string;
    longUrl: string;
    urlCode: string;
    clicks: number;
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export const apiService = {
    shortenUrl: async (longUrl: string): Promise<ShortenResponse> => {
        try {
            const response = await client.post("/api/url/shorten", { longUrl });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                 throw new Error(error.response.data.message || "Failed to shorten URL");
            }
            throw new Error("An unexpected error occurred");
        }
    },
    getUrlStats: async (code: string): Promise<ShortenResponse> => {
        try {
            const response = await client.get(`/api/url/stats/${code}`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                 throw new Error(error.response.data.message || "Failed to fetch stats");
            }
            throw new Error("An unexpected error occurred");
        }
    }
};
