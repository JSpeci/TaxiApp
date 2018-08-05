import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { observable, computed, action } from 'mobx';
import { observer, inject } from 'mobx-react';
import { Provider } from 'mobx-react';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { Model } from './index';

import { ApiRequest } from './Utils/ApiRequest';
import { ObjednavkyComponent } from './Copmponents/ObjednavkyComponent';
import { ObjednavkyModel } from './Models/ObjednavkyModel';
import { MyMenu } from './Copmponents/MyMenu';
import { UzivateleComponent } from './Copmponents/UzivateleComponent';
import { DochazkaComponent } from './Copmponents/DochazkaComponent';
import { PrehledComponent } from './Copmponents/PrehledComponent';



export interface AppProps {
  //objednavkyStore: ObjednavkyModel;
}
export default class App extends React.Component<AppProps> {

  constructor(props: AppProps) {
    super(props);
  }

  public render() {

    return (
      <Router>
        <div className="App">
          <MyMenu />
          <Route path='/Prehled' component={PrehledComponent} />
          <Route path='/Objednavky' component={ObjednavkyComponent} />
          <Route path='/Dochazka' component={DochazkaComponent} />
        </div>
      </Router>
    );
  }
}