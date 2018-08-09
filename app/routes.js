import React from 'react';
import { Route, Switch } from 'react-router-dom';
import FilterableTable from './containers/FilterableTable';
import About from './components/About';
import Login from './containers/Login';

export default (
	<Switch>
		<Route exact path="/" component={Login} />
		<Route path="/about" component={About} />
	</Switch>
);
