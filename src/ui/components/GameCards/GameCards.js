import React from 'react';
import classes from "./GameCards.module.scss";
import GameCard from "../GameCard/GameCard";

const GameCards = ({cards}) => {

    return (
        <div className={classes.cards}>
            {cards.map((card) => {
                return <GameCard key={card.id} card={card}/>;
            })}
        </div>
    );
};

export default GameCards;
