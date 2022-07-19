import React from 'react';
import {useParams} from "react-router-dom";
import Preloader from "../../components/Preloader/Preloader";
import GameDetails from "./GameDetails";
import {
    $gameDetails,
    $gameScreenshots,
    GameDetailsGate,
    getGameDetailsFx,
} from "../../../bll/effector";
import { useStore } from "effector-react";

const GameDetailsContainer = () => {
    const {slug} = useParams()

    const gameDetails = useStore($gameDetails);
    const gameScreenshots = useStore($gameScreenshots);
    const isLoading = useStore(getGameDetailsFx.pending);

    return (
        <>
            <GameDetailsGate slug={slug} />
            {isLoading && <Preloader/>}
            {gameDetails && (
                <GameDetails
                    gameDetails={gameDetails}
                    gameScreenshots={gameScreenshots}
                />
            )}
        </>

    );
};

export default GameDetailsContainer;
