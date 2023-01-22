import {legacy_createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './RootReducer';
import thunk from 'redux-thunk';

declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

export default function configureStore(initialState? : any){
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    return legacy_createStore(
         rootReducer,
         initialState, 
         composeEnhancers(applyMiddleware(thunk))
    );
}