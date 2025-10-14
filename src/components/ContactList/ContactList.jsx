// src/components/ContactList/ContactList.jsx

import { useSelector } from "react-redux";
import { selectContacts } from "../../redux/contactsSlice"; // İletişim listesi seçici
import { selectNameFilter } from "../../redux/filtersSlice"; // Filtre değeri seçici
import Contact from "../Contact/Contact"; // ⚠️ Bileşen adını doğru import edin (export default varsayarak)
import css from "./ContactList.module.css"; // Stil dosyanızı import edin

// Görünür iletişim listesini hesaplayan fonksiyon (Filtreleme Mantığı)
const getVisibleContacts = (contacts, nameFilter) => {
  if (!nameFilter) {
    return contacts; // Filtre boşsa tüm listeyi döndür
  }

  const normalizedFilter = nameFilter.toLowerCase();

  return contacts.filter((contact) =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );
};

// Bileşen artık prop almıyor
const ContactList = () => {
  // Redux Store'dan gerekli verileri çekme
  const contacts = useSelector(selectContacts); // Tüm iletişim listesi
  const filter = useSelector(selectNameFilter); // Filtre değeri

  // Görünür iletişim listesini hesaplama
  const visibleContacts = getVisibleContacts(contacts, filter);

  return (
    <div className={css.container}>
      {visibleContacts.length === 0 && contacts.length > 0 && filter !== "" ? (
        <p className={css.message}>No contacts found matching "{filter}".</p>
      ) : visibleContacts.length === 0 && contacts.length === 0 ? (
        <p className={css.message}>
          Your phonebook is empty. Add a new contact!
        </p>
      ) : (
        <ul className={css.list}>
          {/* VisibleContacts üzerinde map yapıyoruz */}
          {visibleContacts.map((contact) => (
            <li className={css.listItem} key={contact.id}>
              {/* Contact bileşeni de artık onDelete prop'u almayacak, 
                  kendi içinde Redux'a bağlanacak (bir sonraki adımımız bu) */}
              <Contact
                id={contact.id}
                name={contact.name}
                number={contact.number}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Ödev gereksinimi: Varsayılan dışa aktarma (export default)
export default ContactList;
