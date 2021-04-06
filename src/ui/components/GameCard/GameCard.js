import React from 'react';
import classes from "./GameCard.module.scss"
import {useHistory} from 'react-router-dom';
import noImageAvailable from "./no-image-available.png"

const GameCard = React.memo(({card}) => {

    const history = useHistory();

    const onCardClick = () => {
        history.push(`/game/${card.slug}`);
    };

    return (
        <div className={classes.gameCard} onClick={onCardClick}>
            <div className={classes.image}>
                <img className={classes.poster} src={card.background_image || noImageAvailable} alt=""/>
            </div>
            <div className={classes.description}>
                <div className={classes.descriptionRow}>
                    <h2 className={classes.name}>{card.name}</h2>
                    {card.rating !== 0 && <div className={classes.rating}>{card.rating.toFixed(1)}</div>}
                </div>
                <p className={classes.released}>Released: {card.released}</p>
            </div>
        </div>

    );
});

export default GameCard;
