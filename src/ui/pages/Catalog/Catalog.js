import React from 'react';
import GameCards from "../../components/GameCards/GameCards";
import Search from "../../components/Search/Search";
import Select from "../../components/Select/Select";
import classes from "./Catalog.module.scss";
import LoadMore from "../../components/LoadMore/LoadMore";


const sortValues = [
    {id: "", name: "none"},
    {id: "rating", name: "rating from lowest"},
    {id: "-rating", name: "rating from highest"},
    {id: "-released", name: "released new"},
    {id: "released", name: "released oldest"},
];

const Catalog = ({allPlatforms, isMorePages, cards, setSearch, orderCards, filterPlatforms, getMoreCards}) => {

    return (
        <>
            <header className={classes.header}>
                <Search getSearchWord={setSearch}/>
                <div className={classes.settings}>
                    <Select options={sortValues} onChange={orderCards} title={"Sort by:"}/>
                    <Select options={allPlatforms} onChange={filterPlatforms} title={"Platform:"}/>
                </div>
            </header>
            <GameCards cards={cards}/>
            {!isMorePages && !cards.length && <h2 className={classes.noResults}>No results</h2>}
            <LoadMore isMorePages={isMorePages} getMoreCards={getMoreCards}/>
        </>
    );
};

export default Catalog;
