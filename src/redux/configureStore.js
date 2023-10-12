import { createStore, applyMiddleware } from 'redux';
import rootReducer from './index';
import thunk from 'redux-thunk';

function configure(){
    return createStore(rootReducer, applyMiddleware(thunk));
}

export default configure;