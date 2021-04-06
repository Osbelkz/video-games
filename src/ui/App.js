import './App.scss';
import {Switch, Route} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCards, getPlatforms} from "../bll/reducer";
import Catalog from "./pages/Catalog/Catalog";
import GameDetails from "./pages/GameDetails/GameDetails";
import CatalogContainer from "./pages/Catalog/CatalogContainer";
import GameDetailsContainer from "./pages/GameDetails/GameDetailsContainer";

function App() {

    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(getPlatforms())
    }, [])

  return (
    <main className="App">
      <Switch>
        <Route path={"/"} exact render={() => <CatalogContainer/>}/>
        <Route path={"/game/:slug"} render={() => <GameDetailsContainer />}/>
        <Route path={"*"} render={() => <h2 className={"page-not-found"}>Page not found</h2>}/>
      </Switch>
    </main>
  );
}

export default App;
