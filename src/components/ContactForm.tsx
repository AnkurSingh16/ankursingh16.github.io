import { useState, type FormEvent, type ReactNode } from 'react';
import { TOPICS, type Topic } from '../content/types';
import { sendContact, validateContact, type ContactErrors } from '../lib/contact';

interface ContactFormProps {
  endpoint: string;
  topic: Topic;
  onTopicChange: (topic: Topic) => void;
}

type Status = 'idle' | 'sending' | 'sent' | 'failed';

export default function ContactForm({ endpoint, topic, onTopicChange }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = { name, email, topic, message };
    const found = validateContact(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus('sending');
    try {
      await sendContact(endpoint, values);
      setStatus('sent');
      setName('');
      setEmail('');
      setMessage('');
    } catch {
      setStatus('failed');
    }
  }

  if (status === 'sent') {
    return (
      <div className="contact-form contact-form--sent" role="status">
        <h3>Message sent</h3>
        <p>Thanks for getting in touch. I'll reply to the email address you gave.</p>
        <button className="btn btn-outline" type="button" onClick={() => setStatus('idle')}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate aria-label="Contact form">
      <div className="row">
        <Field id="c-name" label="Name" error={errors.name}>
          <input
            id="c-name"
            name="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'c-name-error' : undefined}
          />
        </Field>
        <Field id="c-email" label="Email" error={errors.email}>
          <input
            id="c-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'c-email-error' : undefined}
          />
        </Field>
      </div>

      <Field id="c-topic" label="What's it about?">
        <select
          id="c-topic"
          name="topic"
          value={topic}
          onChange={(e) => onTopicChange(e.target.value as Topic)}
        >
          {TOPICS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      <Field id="c-msg" label="Message" error={errors.message}>
        <textarea
          id="c-msg"
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'c-msg-error' : undefined}
        />
      </Field>

      {status === 'failed' && (
        <p className="form-error" role="alert">
          The message didn't send. Try again, or message me on LinkedIn.
        </p>
      )}

      <div>
        <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && (
        <p className="field-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
