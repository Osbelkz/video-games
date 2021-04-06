import {showcaseAPI} from "../dal/api";

const SET_CARDS = "SET_CARDS";
const SET_GAME_DETAILS = "SET_GAME_DETAILS";
const SET_FILTER = "SET_FILTER";
const SET_SORT = "SET_SORT";
const SET_PLATFORMS = "SET_PLATFORMS";
const SET_SEARCH = "SET_SEARCH";
const SET_SCREENSHOTS = "SET_SCREENSHOTS";

const initialState = {
    isLoading: false,
    cards: [],
    allPlatforms: [],
    lastPage: 0,
    isMorePages: true,
    searchWord: "",
    ordering: "",
    filteredPlatforms: 1,
    gameDetails: {},
    screenshots: [],
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CARDS: {
            return {
                ...state,
                cards: [...state.cards, ...action.payload.cards],
                lastPage: action.payload.page,
                isMorePages: action.payload.isMorePages,
            };
        }
        case SET_GAME_DETAILS:
        case SET_SCREENSHOTS:
        case SET_PLATFORMS: {
            return {
                ...state,
                ...action.payload,
            }
        }
        case SET_SEARCH:
        case SET_FILTER:
        case SET_SORT: {
            return {
                ...state,
                ...action.payload,
                cards: [],
                lastPage: 0,
                isMorePages: true,
            }
        }
        default:
            return state
    }
};


//action creators

const setCards = (cards, page, isMorePages) => (({type: SET_CARDS, payload: {cards, page, isMorePages}}));
const setGameDetails = (gameDetails) => ({type: SET_GAME_DETAILS, payload: {gameDetails}});
const setGameScreenshots = (screenshots) => ({type: SET_SCREENSHOTS, payload: {screenshots}});
export const setFilterPlatform = (filteredPlatforms) =>  ({type: SET_FILTER, payload: {filteredPlatforms}});
export const setOrdering = (ordering) => ({type: SET_SORT, payload: {ordering}});
export const setSearchWord = (searchWord) => ({type: SET_SEARCH, payload: {searchWord}});
export const setPlatforms = (allPlatforms) => ({type: SET_PLATFORMS, payload: {allPlatforms}});


//thunks

export const getCards = () => async (dispatch, getState) => {
    const {lastPage, ordering, filteredPlatforms, searchWord} = getState().showcase;
    try {
        let result =
            await showcaseAPI.getGameCards(lastPage + 1, ordering, searchWord, filteredPlatforms);
        dispatch(setCards(result.data.results, lastPage + 1, !!result.data.next));
    } catch (e) {
        console.log(e)
    }
};

export const getGameDetails = (slug) => async (dispatch, getState) => {
    let result = await showcaseAPI.getGameDetails(slug);
    await dispatch(getGameScreenshots(slug))
    dispatch(setGameDetails(result.data));
};

export const getGameScreenshots = (slug) => async (dispatch, getState) => {
    let result = await showcaseAPI.getGameScreenshots(slug);
    dispatch(setGameScreenshots(result.data.results));
};

export const getPlatforms = () => async (dispatch) => {
    let result = await showcaseAPI.getPlatforms();
    dispatch(setPlatforms(result.data.results));
};
