import ContactForm from "../ContactForm/ContactForm";
import SearchBox from "../SearchBox/SearchBox";
import ContactList from "../ContactList/ContactList";
import css from "./App.module.css";

const App = () => {
  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      {/* İletişim Formu Bölümü */}
      <div className={css.sectionForm}>
        <ContactForm />
      </div>
      {/* İletişim Listesi Bölümü */}
      <div className={css.sectionContact}>
        <h2 className={css.subtitle}>Contacts</h2>
        <SearchBox />
        <ContactList />
      </div>
    </div>
  );
};

export default App;
