import { attach, combine, createEffect, createEvent, createStore, sample } from "effector";
import { showcaseAPI } from "../dal/api";
import { createGate } from "effector-react";

export const resetGameDetails = createEvent();
export const resetCards = createEvent();
export const setFilterPlatform = createEvent<number>();
export const setOrdering = createEvent<string>();
export const setSearchWord = createEvent<string>();
export const setPage = createEvent<number>();

export const GameDetailsGate = createGate<{slug: string}>();

export const getPlatformsFx = createEffect(async () => {
    const response = await showcaseAPI.getPlatforms();
    return response.data;
});

export const getCardsFx = createEffect(async (params?: any) => {
    const response = await showcaseAPI.getGameCards(params?.page, params?.ordering, params?.search, params?.platforms);
    return response.data;
});

export const getGameDetailsFx = createEffect(async (slug: string) => {
    const response = await showcaseAPI.getGameDetails(slug);
    return response.data;
});

export const getGameScreenshotsFx = createEffect(async (slug: string) => {
    const response = await showcaseAPI.getGameScreenshots(slug);
    return response.data;
});

export const $platforms = createStore<any[]>([])
  .on(getPlatformsFx.doneData, (state, payload) => payload.results)

export const $gameCards = createStore<any[]>([])
  .on(getCardsFx.doneData, (state, payload) => state.concat(payload.results))
  .reset(resetCards)

export const $hasNextPage = createStore<boolean>(true)
  .on(getCardsFx.doneData, (state, payload) => !!payload.next)
  .reset(resetCards)

export const $page = createStore<number>(0)
  .on(setPage, (state, payload) => state + 1)
  .reset(resetCards)

export const $ordering = createStore<string>('')
  .on(setOrdering, (state, payload) => payload)

export const $filterPlatform = createStore<number>(1)
  .on(setFilterPlatform, (state, payload) => payload)

export const $searchWord = createStore<string>('')
  .on(setSearchWord, (state, payload) => payload)

export const $gameDetails = createStore<null | any>(null)
  .on(getGameDetailsFx.doneData, (state, payload) => payload)
  .reset(resetGameDetails)

export const $gameScreenshots = createStore<any[]>([])
  .on(getGameScreenshotsFx.doneData, (state, payload) => payload.results)
  .reset(resetGameDetails)

export const $gameCardsParams = combine({
    ordering: $ordering,
    platforms: $filterPlatform,
    search: $searchWord,
})

export const getCardsWithParamsFx = attach({
    effect: getCardsFx,
    source: { search: $searchWord, platforms: $filterPlatform, ordering: $ordering, page: $page},
    mapParams: (params, sources) => sources,
})

sample({
    clock: GameDetailsGate.open,
    source: GameDetailsGate.state,
    fn: (clock, source) => source.slug,
    target: getGameDetailsFx,
})

sample({
    clock: $gameCardsParams,
    target: resetCards,
})
sample({
    clock: getGameDetailsFx.done,
    fn: (clock) => clock.params,
    target: getGameScreenshotsFx,
})