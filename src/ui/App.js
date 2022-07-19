import './App.scss';
import {Switch, Route} from "react-router-dom";
import React, {useEffect} from "react";
import CatalogContainer from "./pages/Catalog/CatalogContainer";
import GameDetailsContainer from "./pages/GameDetails/GameDetailsContainer";
import { getPlatformsFx } from "../bll/effector";

function App() {
    useEffect(() => {
        getPlatformsFx();
    }, []);

    return (
        <main className="App">
            <Switch>
                <Route path={"/"} exact render={() => <CatalogContainer/>}/>
                <Route path={"/game/:slug"} render={() => <GameDetailsContainer/>}/>
                <Route path={"*"} render={() => <h2 className={"page-not-found"}>Page not found</h2>}/>
            </Switch>
        </main>
    );
}

export default App;
