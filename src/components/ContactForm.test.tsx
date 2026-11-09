import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { site } from '../content/site';
import { ENDPOINT } from '../test/fixtures';
import Contact from './Contact';
import ContactForm from './ContactForm';

function renderForm(onTopicChange = vi.fn()) {
  render(<ContactForm endpoint={ENDPOINT} topic="Mentoring" onTopicChange={onTopicChange} />);
  return { onTopicChange };
}

async function fillValid(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText('Name'), 'Priya Shah');
  await user.type(screen.getByLabelText('Email'), 'priya@example.com');
  await user.type(screen.getByLabelText('Message'), 'I am a new EM and would like some help.');
}

describe('ContactForm', () => {
  it('shows what is missing and does not send an empty form', async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    renderForm();

    await user.click(screen.getByRole('button', { name: 'Send message' }));

    expect(screen.getByText('Enter your name.')).toBeInTheDocument();
    expect(screen.getByText('Enter your email address.')).toBeInTheDocument();
    expect(screen.getByText('Tell me a bit more: at least 10 characters.')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toHaveAttribute('aria-invalid', 'true');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('rejects an email address without a domain', async () => {
    const user = userEvent.setup();
    vi.stubGlobal('fetch', vi.fn());
    renderForm();

    await user.type(screen.getByLabelText('Email'), 'priya@');
    await user.click(screen.getByRole('button', { name: 'Send message' }));

    expect(screen.getByText('Enter an email address like name@example.com.')).toBeInTheDocument();
  });

  it('sends the message as JSON and confirms it was sent', async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal('fetch', fetchMock);
    renderForm();

    await fillValid(user);
    await user.click(screen.getByRole('button', { name: 'Send message' }));

    expect(await screen.findByRole('heading', { name: 'Message sent' })).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(ENDPOINT);
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body)).toEqual({
      name: 'Priya Shah',
      email: 'priya@example.com',
      topic: 'Mentoring',
      message: 'I am a new EM and would like some help.',
    });
  });

  it('says so when the form service fails, and keeps what was typed', async () => {
    const user = userEvent.setup();
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500 }));
    renderForm();

    await fillValid(user);
    await user.click(screen.getByRole('button', { name: 'Send message' }));

    expect(await screen.findByRole('alert')).toHaveTextContent("The message didn't send.");
    expect(screen.getByLabelText('Name')).toHaveValue('Priya Shah');
  });

  it('reports topic changes to the parent', async () => {
    const user = userEvent.setup();
    const { onTopicChange } = renderForm();

    await user.selectOptions(screen.getByLabelText("What's it about?"), 'A software project');

    expect(onTopicChange).toHaveBeenCalledWith('A software project');
  });
});

describe('Contact', () => {
  it('offers a LinkedIn message instead of a form until a form endpoint is set', () => {
    render(<Contact links={site.links} formEndpoint={null} topic="Mentoring" onTopicChange={vi.fn()} />);
    expect(screen.queryByRole('form', { name: 'Contact form' })).not.toBeInTheDocument();
    expect(screen.getByText('Mentoring')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Message me on LinkedIn' })).toHaveAttribute('href', site.links.linkedin);
  });

  it('shows the email address only once one is set', () => {
    const { rerender } = render(
      <Contact links={site.links} formEndpoint={null} topic="Mentoring" onTopicChange={vi.fn()} />,
    );
    expect(screen.queryByRole('link', { name: /@/ })).not.toBeInTheDocument();

    rerender(
      <Contact
        links={{ ...site.links, email: 'hello@ankurpawar.com' }}
        formEndpoint={ENDPOINT}
        topic="Mentoring"
        onTopicChange={vi.fn()}
      />,
    );
    expect(screen.getByRole('link', { name: 'hello@ankurpawar.com' })).toHaveAttribute(
      'href',
      'mailto:hello@ankurpawar.com',
    );
    expect(screen.getByRole('form', { name: 'Contact form' })).toBeInTheDocument();
  });
});
