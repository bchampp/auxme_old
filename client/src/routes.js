import React from "react";
import { Switch } from "react-router-dom";

// Custom Route Wrapper -- also dont need this. 
import AppRoute from './utils/AppRoute';

// Layout Components -- we dont necessarily need this though
import LayoutDefault from './layouts/LayoutDefault';

// Routing Components
import Home from './components/pages/landing/Home';
import About from './components/pages/about/About';
import Play from './components/pages/play/Play';
import Control from './components/pages/control/Control';
import Party from './components/pages/party/Party';
import Shop from './components/pages/shop/Shop';
import NotFound from './components/pages/NotFound';

const Routes = ({ location }) => {
    return (
        <div>
            {/* Move NavBar and Footer to be global (not included in router switch) */}
            <Switch>
                <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
                <AppRoute exact path="/about" component={About} layout={LayoutDefault} />
                <AppRoute exact path="/play" component={Play} layout={LayoutDefault} />
                <AppRoute exact path="/shop" component={Shop} layout={LayoutDefault} />
                <AppRoute exact path="/party" component={Party} layout={LayoutDefault} />
                <AppRoute exact path="/control" component={Control} layout={LayoutDefault} />
                {/* Default Page for when nothing hits */}
                <AppRoute exact path="*" component={NotFound} />
            </Switch>
        </div>
    )

};

export default Routes;
