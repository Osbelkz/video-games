import React from 'react';
import classes from "./GameDetails.module.scss"
import {Slider} from "../../components/Carousel/Slider";

const GameDetails = ({gameDetails, gameScreenshots}) => {
    console.log(gameDetails.description_raw.split("###"))
    return (
        <section className={classes.gameDetails}>
            <h1 className={classes.title}>{gameDetails.name}</h1>
            <div className={classes.details}>
                <ul className={classes.overview}>
                    <li>
                        <p><b>Company:</b>{' '} {gameDetails.developers.map(dev => dev.name).join(", ")}</p>
                    </li>
                    <li>
                        <p><b>Genre:</b>{' '} {gameDetails.genres.map(genre => genre.name).join(", ")}</p>
                    </li>
                    <li>
                        <p><b>Release:</b> {gameDetails.released}</p>
                    </li>
                    <li>
                        <p><b>Voted:</b> ★{gameDetails.rating}/5.0</p>
                    </li>
                    <li>
                        <p><b>Website:</b> <a href={gameDetails.website}>{gameDetails.website}</a></p>
                    </li>
                </ul>
                <article>
                    <p><b>Description:</b></p>
                    <p className={classes.description}>{gameDetails.description_raw}</p>
                </article>
            </div>
            <Slider images={gameScreenshots}/>
        </section>
    );
};

export default GameDetails;
