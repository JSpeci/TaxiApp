import * as React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import { ObjednavkyComponent } from './Copmponents/ObjednavkyComponent';
import { MyMenu } from './Copmponents/MyMenu';
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
          <MyHeader />
          <Route path='/Prehled' component={PrehledComponent} />
          <Route path='/Objednavky' component={ObjednavkyComponent} />
          <Route path='/Dochazka' component={DochazkaComponent} />
        </div>
      </Router>
    );
  }
}