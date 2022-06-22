import { ContactStyled, ContactForm, FormElement, FormElementTextArea, FormElementButton } from './Contact.styled';
import React from 'react';
import AddButton from '../generics/AddButton.styled';
import useFormInput from '../../hooks/useFormInput';

function Contact() {

  const [email, handleEmailChange, resetEmail] = useFormInput('');
  const [subject, handleSubjectChange, resetSubject] = useFormInput('');
  const [message, handleMessageChange, resetMessage] = useFormInput('');

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <ContactStyled>
      <h2>Contact Us</h2>
      <ContactForm>
        <FormElement>
          <label>Your Email</label>
          <input value={email} onChange={handleEmailChange} />
        </FormElement>
        <FormElement>
          <label>Subject</label>
          <input value={subject} onChange={handleSubjectChange} autoComplete="off" />
        </FormElement>
        <FormElementTextArea>
          <label>Message</label>
          <textarea value={message} onChange={handleMessageChange}></textarea>
        </FormElementTextArea>
        <FormElementButton>
          <AddButton onClick={handleSubmit}>Submit</AddButton>
        </FormElementButton>
      </ContactForm>
    </ContactStyled>
  )
}

export default Contact;