import { Formik, Form, Field, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import * as Yup from "yup";
import { useDispatch } from "react-redux"; // ⬅️ Redux Hook'u
import { addContact } from "../../redux/contactsSlice"; // ⬅️ Action Creator
import css from "./ContactForm.module.css";

// Yup ile doğrulama şeması
const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

// Formun başlangıç değerleri
const initialValues = {
  name: "",
  number: "",
};

// Bileşen artık prop almaz (Redux gereksinimi)
const ContactForm = () => {
  const dispatch = useDispatch(); // ⬅️ Dispatch fonksiyonunu alıyoruz
  const nameId = nanoid();
  const numberId = nanoid();

  const handleSubmit = (values, actions) => {
    // Yeni kişi objesini oluşturuyoruz
    const newContact = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };

    // ⬅️ addContact Action Creator'ını çağırıp, sonucu dispatch ediyoruz
    dispatch(addContact(newContact));

    // Formu temizliyoruz
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ContactSchema}
    >
      <Form className={css.form}>
        <div className={css.inputField}>
          <label htmlFor={nameId}>Name</label>
          <Field type="text" name="name" id={nameId} />
          <ErrorMessage name="name" component="span" className={css.error} />
        </div>

        <div className={css.inputField}>
          <label htmlFor={numberId}>Number</label>
          <Field type="text" name="number" id={numberId} />
          <ErrorMessage name="number" component="span" className={css.error} />
        </div>

        <button type="submit" className={css.button}>
          Add Contact
        </button>
      </Form>
    </Formik>
  );
};

// ⬅️ Ödev gereksinimi: Varsayılan dışa aktarma (export default)
export default ContactForm;
