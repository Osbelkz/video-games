import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {getGameDetails} from "../../../bll/reducer";
import Preloader from "../../components/Preloader/Preloader";
import GameDetails from "./GameDetails";

const GameDetailsContainer = () => {

    const dispatch = useDispatch()
    const {slug} = useParams()

    const gameDetails = useSelector(state => state.showcase.gameDetails)
    const gameScreenshots = useSelector(state => state.showcase.screenshots)

    useEffect(() => {
        dispatch(getGameDetails(slug))
    }, [slug, dispatch])


    if (!gameDetails || (gameDetails.slug !== slug)) {
        return <Preloader/>
    }

    return (
        <GameDetails gameDetails={gameDetails}
                     gameScreenshots={gameScreenshots}
        />
    );
};

export default GameDetailsContainer;
