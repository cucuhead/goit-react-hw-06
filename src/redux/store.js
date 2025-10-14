// src/redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage'ı kullanır

// 1. Oluşturduğumuz Reducer'ları import etme
import { contactsReducer } from "./contactsSlice";
import { filtersReducer } from "./filtersSlice";

// 2. Redux Persist Yapılandırması (contacts.items için)
// Ödev gereksinimi: İletişim dizisini (items) yerel depolamada saklama
const contactsPersistConfig = {
  key: "contacts", // localStorage'da kullanılacak anahtar
  storage,
  whitelist: ["items"], // Sadece 'items' dizisinin saklanmasını sağlıyoruz
};

// 3. Persist'i contactsReducer'a uygulama
const persistedContactsReducer = persistReducer(
  contactsPersistConfig,
  contactsReducer
);

// 4. Store'u oluşturma
export const store = configureStore({
  reducer: {
    // Reducer'ları birleştirme
    contacts: persistedContactsReducer, // Persist uygulanmış contact reducer
    filters: filtersReducer, // Filter reducer
  },
  // 5. Redux Persist için gerekli middleware ayarı
  // Bu, persist aksiyonlarının serializable (serileştirilebilir) olmadığı uyarılarını engeller.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 6. Persistor'u dışa aktarma (ana dosyamızda PersistGate için kullanacağız)
export const persistor = persistStore(store);
