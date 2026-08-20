import { useState } from 'react';
import SectionReveal, { RevealItem } from './SectionReveal';
import MagneticButton from './MagneticButton';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/rajanpantha456@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio Message: ${formData.name}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      const data = await response.json();

      // Check if FormSubmit returned an activation required notice
      if (data.message && data.message.toLowerCase().includes('activation')) {
        setStatus('needs_activation');
        setFormData({ name: '', email: '', message: '' });
        return;
      }

      if (response.ok && (data.success === 'true' || data.success === true)) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(data.message || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setStatus('error');
      setErrorMsg(err.message || 'Something went wrong. Please try again later.');
    }
  };

  return (
    <SectionReveal
      id="contact"
      className="py-24 md:py-32 bg-bg-elevated border-t border-white/[0.06] relative"
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <RevealItem className="text-center mb-12">
          <div className="font-display text-xs font-medium tracking-[0.2em] uppercase text-accent mb-4">
            ● GET IN TOUCH
          </div>
          <h2
            className="font-display font-bold text-text-primary leading-[1.1] mb-4"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            Let's build<br />
            something <em className="italic font-light bg-gradient-to-br from-accent to-accent-bright bg-clip-text text-transparent">bold</em>.
          </h2>
          <p className="text-base text-text-secondary max-w-[520px] mx-auto leading-relaxed">
            Have a project in mind? I'd love to hear about it. Send me a message and it will go directly to my inbox.
          </p>
        </RevealItem>

        <RevealItem>
          <div className="card max-w-[700px] mx-auto bg-bg-card border border-white/[0.06] rounded-[20px] p-8 md:p-10 relative overflow-hidden transition-all duration-500 hover:border-accent/15 group">
            {/* Top glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[20px]" />

            <form onSubmit={handleSubmit} className="relative z-[1]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label htmlFor="name" className="block font-display text-xs font-medium text-text-secondary mb-2 tracking-wide">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-text-primary text-sm outline-none transition-all duration-300 placeholder:text-text-muted focus:border-accent focus:bg-accent/[0.03] focus:shadow-[0_0_20px_rgba(255,92,26,0.06)] disabled:opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block font-display text-xs font-medium text-text-secondary mb-2 tracking-wide">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    disabled={status === 'loading'}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-text-primary text-sm outline-none transition-all duration-300 placeholder:text-text-muted focus:border-accent focus:bg-accent/[0.03] focus:shadow-[0_0_20px_rgba(255,92,26,0.06)] disabled:opacity-50"
                  />
                </div>
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block font-display text-xs font-medium text-text-secondary mb-2 tracking-wide">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  disabled={status === 'loading'}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.06] rounded-xl text-text-primary text-sm outline-none transition-all duration-300 placeholder:text-text-muted focus:border-accent focus:bg-accent/[0.03] focus:shadow-[0_0_20px_rgba(255,92,26,0.06)] resize-y min-h-[120px] disabled:opacity-50"
                />
              </div>

              {/* Status Message Alerts */}
              {status === 'needs_activation' && (
                <div className="mb-6 p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-300 text-sm flex items-start gap-3">
                  <svg className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <strong className="block text-white font-medium mb-1">One-Time Activation Required</strong>
                    <span>FormSubmit has sent an activation link to <strong>rajanpantha456@gmail.com</strong>. Please open your Gmail (check inbox & spam folder) and click <strong>"Activate Form"</strong> to begin receiving all messages.</span>
                  </div>
                </div>
              )}

              {status === 'success' && (
                <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 text-sm flex items-center gap-3 animate-fade-in">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Thank you! Your message has been sent successfully to <strong>rajanpantha456@gmail.com</strong>.</span>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{errorMsg || 'Failed to send message. Please try again.'}</span>
                </div>
              )}

              <MagneticButton className="w-full">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={`w-full py-3.5 rounded-full font-display text-sm font-semibold tracking-wide text-white transition-all duration-400 relative overflow-hidden flex items-center justify-center gap-2 ${
                    status === 'success'
                      ? 'bg-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)]'
                      : status === 'needs_activation'
                      ? 'bg-orange-600 hover:bg-orange-500 shadow-[0_0_30px_rgba(255,92,26,0.3)]'
                      : status === 'loading'
                      ? 'bg-accent/70 cursor-wait'
                      : 'bg-accent hover:bg-accent-bright shadow-[0_0_30px_rgba(255,92,26,0.15)] hover:shadow-[0_0_50px_rgba(255,92,26,0.4)] hover:-translate-y-0.5'
                  }`}
                >
                  {status === 'loading' && (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {status === 'loading'
                    ? 'Sending Message...'
                    : status === 'success'
                    ? 'Message Sent ✓'
                    : status === 'needs_activation'
                    ? 'Activation Email Sent — Check Inbox'
                    : 'Send Message'}
                </button>
              </MagneticButton>
            </form>
          </div>
        </RevealItem>
      </div>
    </SectionReveal>
  );
}
