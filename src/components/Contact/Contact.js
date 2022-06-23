import { ContactStyled, ContactForm, FormElement, FormElementTextArea, FormElementButton } from './Contact.styled';
import React from 'react';
import AddButton from '../generics/AddButton.styled';
import useFormInput from '../../hooks/useFormInput';
import { send } from 'emailjs-com';

function Contact() {

  const [email, handleEmailChange, resetEmail] = useFormInput('');
  const [subject, handleSubjectChange, resetSubject] = useFormInput('');
  const [message, handleMessageChange, resetMessage] = useFormInput('');

  async function handleSubmit(e) {
    e.preventDefault();

    const toSend = {
      subject: subject,
      message: message,
      reply_to: email,
    }

    try {
      await send(
        'service_ry9nw6o',
        'template_rgtfd6p',
        toSend,
        'pRo2AOTzC8blSvLC1',
      )
    }
    catch (error) {
      console.log(error.message);
    }

    resetEmail();
    resetSubject();
    resetMessage();
  }

  return (
    <ContactStyled>
      <h2>Contact Us</h2>
      <ContactForm>
        <FormElement>
          <label>Your Email</label>
          <input value={email} type="email" required onChange={handleEmailChange} />
        </FormElement>
        <FormElement>
          <label>Subject</label>
          <input value={subject} type="text" required onChange={handleSubjectChange} autoComplete="off" />
        </FormElement>
        <FormElementTextArea>
          <label>Message</label>
          <textarea value={message} required onChange={handleMessageChange}></textarea>
        </FormElementTextArea>
        <FormElementButton>
          <AddButton onClick={handleSubmit}>Submit</AddButton>
        </FormElementButton>
      </ContactForm>
    </ContactStyled>
  )
}

export default Contact;