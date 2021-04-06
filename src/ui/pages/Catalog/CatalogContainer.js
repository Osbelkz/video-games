import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCards, setFilterPlatform, setOrdering, setSearchWord} from "../../../bll/reducer";
import Catalog from "./Catalog";

const CatalogContainer = () => {

    const dispatch = useDispatch();
    const cards = useSelector(state => state.showcase.cards);
    const platformFilter = useSelector(state => state.showcase.platforms);
    const ordering = useSelector(state => state.showcase.ordering);
    const searchWord = useSelector(state => state.showcase.searchWord);
    const isMorePages = useSelector(state => state.showcase.isMorePages);
    const allPlatforms = useSelector(state => state.showcase.allPlatforms);

    useEffect(() => {
        if (cards.length) {
            dispatch(getCards());
        }
    }, [platformFilter, ordering, searchWord]);

    const orderCards = useCallback((value) => {
        dispatch(setOrdering(value));
    }, []);
    const filterPlatforms = useCallback((value) => {
        dispatch(setFilterPlatform(value));
    }, []);

    const getMoreCards = useCallback(() => {
        if (isMorePages) {
            dispatch(getCards());
        }
    }, [isMorePages]);

    const setSearch = useCallback((searchWord) => {
        dispatch(setSearchWord(searchWord))
    }, []);

    return <Catalog setSearch={setSearch}
                 orderCards={orderCards}
                 allPlatforms={allPlatforms}
                 isMorePages={isMorePages}
                 cards={cards}
                 getMoreCards={getMoreCards}
                 filterPlatforms={filterPlatforms}/>
    ;
};

export default CatalogContainer;
