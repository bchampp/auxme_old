import React from "react";
import { Switch } from "react-router-dom";
import AppRoute from './utils/AppRoute';

// Layouts
import LayoutDefault from './layouts/LayoutDefault';

// Views / Pages 
import Home from './components/landing/Home';
import Play from './components/play/Play';
import Shop from "./components/pages/shop/Shop";

const Routes = ({ location }) => {
    return (
        <div>
            <Switch>
                <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
                <AppRoute exact path="/play" component={Play} layout={LayoutDefault} />
                <AppRoute exact path="/shop" component={Shop} layout={LayoutDefault} />

            </Switch>
        </div>
    )

};

export default Routes;
