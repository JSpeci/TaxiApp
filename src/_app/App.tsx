import * as React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import { ObjednavkyComponent } from './Copmponents/ObjednavkyComponent';
import { MyHeader } from './MyHeader/MyHeader';
import { PrehledComponent } from './Copmponents/PrehledComponent';
import { DochazkaLoaderComponent } from './Dochazka/DochazkaLoaderComponent';



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
          <MyHeader />
          <Route path='/FrontaRidicu' component={PrehledComponent} />
          <Route path='/FrontaObjednavek' component={ObjednavkyComponent} />
          <Route path='/Dochazka' component={DochazkaLoaderComponent} />
        </div>
      </Router>
    );
  }
}