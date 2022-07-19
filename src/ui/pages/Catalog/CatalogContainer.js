import React, { useCallback } from 'react';
import Catalog from "./Catalog";
import {
    $gameCards,
    $hasNextPage,
    $platforms,
    setOrdering,
    setSearchWord,
    setFilterPlatform,
    setPage,
    getCardsWithParamsFx,
} from "../../../bll/effector";
import { useStore } from "effector-react";

const CatalogContainer = () => {
    const cards = useStore($gameCards);
    const isMorePages = useStore($hasNextPage);
    const allPlatforms = useStore($platforms);

    const getMoreCards = useCallback(() => {
        if (isMorePages) {
            setPage();
            getCardsWithParamsFx();
        }
    }, [isMorePages]);

    return <Catalog setSearch={setSearchWord}
                    orderCards={setOrdering}
                    allPlatforms={allPlatforms}
                    isMorePages={isMorePages}
                    cards={cards}
                    getMoreCards={getMoreCards}
                    filterPlatforms={setFilterPlatform}/>
        ;
};

export default CatalogContainer;
