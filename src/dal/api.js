import axios from "axios";

const API_KEY = process.env.APP_API;
const API_URL = "https://api.rawg.io/api/";

const instance = axios.create({
    baseURL: API_URL,
    params: {
        api_key: API_KEY,
    },
});

export const showcaseAPI = {
    getGameCards(page, ordering, search, platforms) {
        return instance.get(`games`, {
            params: {
                platforms,
                ordering,
                search,
                page,
            }
        });
    },
    getGameDetails(slug) {
        return instance.get(`/games/${slug}`);
    },
    getGameScreenshots(slug) {
        return instance.get(`/games/${slug}/screenshots`);
    },
    getPlatforms() {
        return instance.get(`/platforms`);
    },
}
