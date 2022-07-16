import { ContactStyled, ContactForm, FormElement, FormElementTextArea, FormElementButton } from './Contact.styled';
import React, { useState } from 'react';
import AddButton from '../generics/AddButton.styled';
import useFormInput from '../../hooks/useFormInput';
import { send } from 'emailjs-com';
import Loading from '../Loading/Loading';

function Contact() {

  const [email, handleEmailChange, resetEmail] = useFormInput('');
  const [subject, handleSubjectChange, resetSubject] = useFormInput('');
  const [message, handleMessageChange, resetMessage] = useFormInput('');

  const [emailError, setEmailError] = useState('');
  const [subjectError, setSubjectError] = useState('');
  const [messageError, setMessageError] = useState('');

  const [finishedSend, setFinishedSend] = useState(false);
  const [loading, setLoading] = useState(false);


  async function handleSubmit(e) {
    e.preventDefault();

    let errors = false;

    if (email.length === 0) {
      errors = true;
      setEmailError('*required')
    } else if (email.indexOf('@') === -1) {
      errors = true;
      setEmailError('*must be valid email address')
    }

    if (subject.length === 0) {
      errors = true;
      setSubjectError('*required')
    }

    if (message.length === 0) {
      errors = true;
      setMessageError('*required')
    }

    if (errors) {
      return;
    }

    setLoading(true);

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

      resetEmail();
      resetSubject();
      resetMessage();
      setFinishedSend(true);
    }
    catch (error) {
      console.log(error.message);
    }

    setLoading(false);
  }

  function emailAndErrors(e) {
    if (emailError) {
      setEmailError('');
    }
    handleEmailChange(e);
  }

  function subjectAndErrors(e) {
    if (subjectError) {
      setSubjectError('');
    }
    handleSubjectChange(e);
  }

  function messageAndErrors(e) {
    if (messageError) {
      setMessageError('');
    }
    handleMessageChange(e);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <ContactStyled>
      <h2>Contact Us</h2>
      {!finishedSend && <ContactForm>
        <FormElement>
          <label>Your Email
            <span>{emailError}</span>
          </label>

          <input value={email} type="email" required onChange={emailAndErrors} />
        </FormElement>
        <FormElement>
          <label>Subject
            <span>{subjectError}</span>
          </label>
          <input value={subject} type="text" required onChange={subjectAndErrors} autoComplete="off" />
        </FormElement>
        <FormElementTextArea>
          <label>Message
            <span>{messageError}</span>
          </label>
          <textarea value={message} required onChange={messageAndErrors}></textarea>
        </FormElementTextArea>
        <FormElementButton>
          <AddButton onClick={handleSubmit}>Submit</AddButton>
        </FormElementButton>
      </ContactForm>}
      {finishedSend &&
        <p>Your message has been sent.</p>
      }
    </ContactStyled>
  )
}

export default Contact;