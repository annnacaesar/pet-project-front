import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistSliceAuth } from './sliceAuth';
import { userApi } from './fetchUser';
import { noticeApi } from './fetchNotice';
import { petsApi } from './fetchPets';
import { newsApi } from './fetchNews';
import { noticeUserReducer } from './sliceNotice';
import { sponsorsApi } from './fetchSponsors';
import { newsReducer } from './sliceNews';


import { persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';


export const store = configureStore({
  reducer: {
    users: persistSliceAuth,
    [userApi.reducerPath]: userApi.reducer,
    [noticeApi.reducerPath]: noticeApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [sponsorsApi.reducerPath]: sponsorsApi.reducer,
    [petsApi.reducerPath]: petsApi.reducer,
    notice: noticeUserReducer,
    news: newsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(userApi.middleware, noticeApi.middleware, petsApi.middleware, newsApi.middleware, sponsorsApi.middleware)
});


export const persistor = persistStore(store);

setupListeners(store.dispatch);
