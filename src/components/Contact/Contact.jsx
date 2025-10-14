import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsSlice";
import css from "./Contact.module.css";
// lucide-react kütüphanesinden telefon ve kullanıcı ikonları import edilebilir
// import { Phone, User } from 'lucide-react'; // Varsayımsal ikonlar

const Contact = ({ id, name, number }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteContact(id));
  };

  return (
    // Dış <li> hatasını düzeltmek için <li> yerine <div> kullanıyoruz.
    <div className={css.wrapper}>
      <div className={css.listDiv}>
        <p className={css.name}>
          {/* <User size={16} style={{ marginRight: '8px' }} /> */}
          {name.toUpperCase()}
        </p>
        <p className={css.number}>
          {/* <Phone size={16} style={{ marginRight: '8px' }} /> */}
          {number}
        </p>
      </div>
      <button type="button" onClick={handleDelete} className={css.deleteBtn}>
        Delete
      </button>
    </div>
  );
};

export default Contact;
