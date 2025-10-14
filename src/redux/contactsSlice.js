// src/redux/contactsSlice.js

import { createSlice } from "@reduxjs/toolkit";

// Başlangıç durumu
const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    // Ödev gereksinimi: items: []
    items: [],
  },
  reducers: {
    // 1. Yeni iletişim ekleme (Action: addContact)
    // payload: yeni iletişim objesi (örneğin: {id: '1', name: 'A', number: '123'})
    addContact: (state, action) => {
      // RTK sayesinde .push() kullanabiliriz, RTK arka planda immutability'yi sağlar.
      state.items.push(action.payload);
    },

    // 2. İletişim silme (Action: deleteContact)
    // payload: silinecek iletişimin id'si
    deleteContact: (state, action) => {
      // Silme işlemi için filter kullanıyoruz
      state.items = state.items.filter(
        (contact) => contact.id !== action.payload
      );
    },
  },
});

// Selector: Tüm iletişim listesini döndürür (useSelector için)
export const selectContacts = (state) => state.contacts.items;

// Action Creator'ları ve Reducer'ı dışa aktarma
export const { addContact, deleteContact } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
