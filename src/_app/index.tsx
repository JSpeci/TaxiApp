import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'mobx-react';
import { ApiRequest } from './Utils/ApiRequest';
import { ObjednavkyModel } from './Models/ObjednavkyModel';
import { DochazkaModel } from './Models/DochazkaModel';

const apiRequest = new ApiRequest();

ReactDOM.render(
  <Provider 
            objednavkyStore={new ObjednavkyModel(apiRequest)}
            dochazkaStore={new DochazkaModel(apiRequest)}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
