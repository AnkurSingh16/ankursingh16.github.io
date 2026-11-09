import type { Topic } from '../content/types';

export interface ContactMessage {
  name: string;
  email: string;
  topic: Topic;
  message: string;
}

export type ContactErrors = Partial<Record<'name' | 'email' | 'message', string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(values: ContactMessage): ContactErrors {
  const errors: ContactErrors = {};
  if (!values.name.trim()) errors.name = 'Enter your name.';
  if (!values.email.trim()) errors.email = 'Enter your email address.';
  else if (!EMAIL_PATTERN.test(values.email.trim()))
    errors.email = 'Enter an email address like name@example.com.';
  if (values.message.trim().length < 10)
    errors.message = 'Tell me a bit more: at least 10 characters.';
  return errors;
}

/** Posts the message as JSON. Works with Formspree and most form backends. */
export async function sendContact(endpoint: string, values: ContactMessage): Promise<void> {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: values.name.trim(),
      email: values.email.trim(),
      topic: values.topic,
      message: values.message.trim(),
    }),
  });
  if (!response.ok) throw new Error(`Form service responded with ${response.status}`);
}
