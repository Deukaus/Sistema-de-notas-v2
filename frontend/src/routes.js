import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Aluno from './pages/Aluno';
import Professor from './pages/Professor';
import Login from './pages/Login';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/aluno" component={Aluno} />
                <Route path="/professor" component={Professor} />
            </Switch>
        </BrowserRouter>
    );
}