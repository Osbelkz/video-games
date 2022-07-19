import axios from "axios";

const API_URL = "https://api.rawg.io/api/";

const instance = axios.create({
    baseURL: API_URL,
    params: {
        key: "8b25a694eec8404c8845d2de861b57d8",
    },
});

export const showcaseAPI = {
    getGameCards(page, ordering, search, platforms) {
        return instance.get(`games`, {
            params: {
                platforms: platforms || undefined,
                ordering: ordering || undefined,
                search: search || undefined,
                page: page ?? undefined,
            },
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
};
