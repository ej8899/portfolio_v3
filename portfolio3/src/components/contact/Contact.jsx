import { FormEvent, useEffect, useRef, useState } from 'react';


function Contact() {
  const headerRef = useRef(null);
  const formRef = useRef(null);

  // const isOnScreen = useElementOnScreen(headerRef, '-100px');
  const isOnScreen = true;

  const [email, setEmail] = useState('');
  const [emailValidation, setEmailValidation] = useState(' ');
  const [name, setName] = useState('');
  const [nameValidation, setNameValidation] = useState(' ');
  const [message, setMessage] = useState('');
  const [messageValidation, setMessageValidation] = useState(' ');
  const [isFormValidated, setIsFormValidated] = useState(false);
  const [isSendPending, setIsSendPending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!isOnScreen) return;
    headerRef.current?.classList.add('animate-in');
    formRef.current?.classList.add('animate-in');
  }, [isOnScreen]);

  const isValidEmail = () => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email) ? true : false;
  };

  const isValidName = () => {
    return name.trim().length >= 2 ? true : false;
  };

  const isValidMessage = () => {
    return message.trim().length >= 15 ? true : false;
  };

  // validate fields when a value changes
  useEffect(() => {
    if (!email || isValidEmail()) setEmailValidation('validated_input');
    else setEmailValidation('A valid e-mail address is required. Example: joe@gmail.com');

    if (!name || isValidName()) setNameValidation('validated_input');
    else setNameValidation('Names must be at least 2 characters long');

    if (!message || isValidMessage()) setMessageValidation('validated_input');
    else setMessageValidation('Messages must be at least 15 characters long');

    if (isValidEmail() && isValidMessage() && isValidName()) setIsFormValidated(true);
    else setIsFormValidated(false);
  }, [email, name, message]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValidated) return;
    setIsSendPending(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: '7160e73c-4a32-4952-ab02-e07ea131ed58',
          from_name: 'erniejohnson.ca',
          subject: 'erniejohnson.ca - contact form response',
          message,
          name,
          email,
          botcheck: '',
        }),
      });
      const json = (await response.json());

      setIsSendPending(false);

      if (!json.success) throw new Error('Something went wrong.');

      setIsSent(true);
    } catch (err) {
      setIsSendPending(false);
      setIsError(true);
    }
  };

  return (
    // book style section separator
    <section className='contact' id='contact' aria-labelledby='contact__title'>
      <div className='custom-shape-divider-top-1680975773' aria-hidden='true'>
        <hr></hr>
      </div>

      {/* section content */}
      <div className='column centered_grid'>
        <div className='contact__content'>
          <div className='contact__header' ref={headerRef}>
            <h2 id='contact__title'>Contact Me</h2> <br />
            <p>Let&apos;s work together!</p>
          </div>

          {!isSendPending && !isSent && !isError && (
            <form
              onSubmit={(e) => void handleFormSubmit(e)}
              noValidate
              aria-label='contact'
              ref={formRef}
            >
              {/* form data */}
              <div className='input-wrapper'>
                <label htmlFor='email'>email</label>
                <input
                  type='email'
                  name='email'
                  id='email'
                  required
                  placeholder='your_email@domain.com'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${
                    email && emailValidation !== 'validated_input' ? 'invalid' : 'valid'
                  }`}
                />
                <p
                  className={`validation-message ${
                    emailValidation === 'validated_input' ? 'invisible' : ''
                  }`}
                >
                  {emailValidation}
                </p>
              </div>

              <div className='input-wrapper'>
                <label htmlFor='name'>name</label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  required
                  placeholder='John Doe'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`${
                    name && nameValidation !== 'validated_input' ? 'invalid' : 'valid'
                  }`}
                />
                <p
                  className={`validation-message ${
                    nameValidation === 'validated_input' ? 'invisible' : ''
                  }`}
                >
                  {nameValidation}
                </p>
              </div>

              <div className='input-wrapper'>
                <label htmlFor='message'>message</label>
                <textarea
                  name='Message'
                  id='message'
                  required
                  placeholder='Hi Ernie!'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${
                    message && messageValidation !== 'validated_input' ? 'invalid' : 'valid'
                  }`}
                ></textarea>
                <p
                  className={`validation-message ${
                    messageValidation === 'validated_input' ? 'invisible' : ''
                  }`}
                >
                  {messageValidation}
                </p>
              </div>
              <button>Send Me A Message</button>
            </form>
          )}

          {/* animated hourglass */}
          {isSendPending && (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='send-status pending'
              viewBox='0 0 24 24'
            >
              <path
                fill='var(--clr-neutral-500)'
                d='M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z'
                opacity='.5'
              />
              <path
                fill='currentColor'
                d='M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z'
                opacity='.75'
              >
                <animateTransform
                  attributeName='transform'
                  dur='2s'
                  from='0 12 12'
                  repeatCount='indefinite'
                  to='360 12 12'
                  type='rotate'
                />
              </path>
            </svg>
          )}

          {/* green checkmark icon */}
          {isSent && (
            <>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='send-status sent'
                viewBox='0 0 24 24'
              >
                <path
                  fill='var(--clr-success)'
                  d='m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4l4.25 4.25ZM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z'
                />
              </svg>
              <p>Thank you for reaching out!</p>
            </>
          )}
        </div>

        {/* error during send */}
        {isError && (
          <>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='send-status error'
              viewBox='0 0 24 24'
            >
              <path
                fill='var(--clr-error)'
                d='M12 17q.425 0 .713-.288T13 16q0-.425-.288-.713T12 15q-.425 0-.713.288T11 16q0 .425.288.713T12 17Zm0-4q.425 0 .713-.288T13 12V8q0-.425-.288-.713T12 7q-.425 0-.713.288T11 8v4q0 .425.288.713T12 13Zm0 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z'
              />
            </svg>
            <p>
              Something went wrong. Email me directly at{' '}
              <a href='mailto:ernie@erniejohnson.ca'>ernie@erniejohnson.ca</a>
            </p>
          </>
        )}
      </div>
    </section>
  );
}

export default Contact;
