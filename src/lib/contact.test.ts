import { describe, expect, it, vi } from 'vitest';
import { sendContact, validateContact, type ContactMessage } from './contact';

const valid: ContactMessage = {
  name: 'Priya Shah',
  email: 'priya@example.com',
  topic: 'Mentoring',
  message: 'I would like help with my first 90 days.',
};

describe('validateContact', () => {
  it('accepts a complete message', () => {
    expect(validateContact(valid)).toEqual({});
  });

  it('treats whitespace-only fields as empty', () => {
    expect(validateContact({ ...valid, name: '   ', email: '  ' })).toEqual({
      name: 'Enter your name.',
      email: 'Enter your email address.',
    });
  });

  it.each(['priya', 'priya@', 'priya@example', '@example.com', 'priya @example.com'])(
    'rejects the malformed email %s',
    (email) => {
      expect(validateContact({ ...valid, email }).email).toBe('Enter an email address like name@example.com.');
    },
  );

  it('asks for a message of at least 10 characters', () => {
    expect(validateContact({ ...valid, message: 'Hi there' }).message).toBe(
      'Tell me a bit more: at least 10 characters.',
    );
  });
});

describe('sendContact', () => {
  it('posts trimmed values as JSON', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal('fetch', fetchMock);

    await sendContact('https://formspree.io/f/abc', { ...valid, name: '  Priya Shah  ' });

    const [, init] = fetchMock.mock.calls[0];
    expect(init.headers).toEqual({ Accept: 'application/json', 'Content-Type': 'application/json' });
    expect(JSON.parse(init.body).name).toBe('Priya Shah');
  });

  it('throws when the service rejects the message', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 422 }));
    await expect(sendContact('https://formspree.io/f/abc', valid)).rejects.toThrow('422');
  });
});
