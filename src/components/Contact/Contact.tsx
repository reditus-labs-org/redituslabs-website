import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import './Contact.css';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = (import.meta as any).env.VITE_CONTACT_ENDPOINT;
    setError('');
    if (!endpoint) { setError('Message delivery is not configured yet. Please try again once the studio has enabled the contact service. Your message has not been sent.'); return; }
    setSending(true);
    try {
      const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }) });
      if (!response.ok) throw new Error('Unable to send');
      setSubmitted(true);
    } catch { setError('Your message could not be sent. Please try again. Your text is still here.'); }
    finally { setSending(false); }
  };

  return (
    <section id="contact" className="contact-section">
      {/* Full-bleed 16:9 Landscape Monolith Background */}
      <div className="contact-bg">
        <img 
          src="/assets/images/contact_monolith_landscape.jpg" 
          alt="Colossal brutalist monolithic chamber with sunlit mountain chasm" 
          className="contact-bg-img"
          loading="eager"
        />
        <div className="contact-overlay" />
      </div>

      <div className="container contact-container">
        <div className="contact-grid">
          {/* Left Form Column */}
          <div className="contact-form-col">
            <h2 className="contact-title">
              <span className="text-light">Let’s build</span><br />
              <span className="text-black">what’s next.</span>
            </h2>
            <p className="contact-subline">
              <span className="text-medium">Tell us about your idea, challenge or opportunity.</span><br />
              <span className="text-light">We’ll get back to you within 1–2 business days.</span>
            </p>

            {submitted ? (
              <div className="contact-success-box" role="status">
                <CheckCircle2 size={28} className="success-icon" />
                <h3>Thank you for reaching out.</h3>
                <p>We have received your message and will connect within 1–2 business days.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group-clean">
                  <input 
                    type="text" 
                    id="contact-name" name="name" aria-label="Name" autoComplete="name" maxLength={120}
                    className="contact-field"
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    placeholder="Name"
                    required
                  />
                </div>

                <div className="form-group-clean">
                  <input 
                    type="email" 
                    id="contact-email" name="email" aria-label="Email" autoComplete="email" maxLength={254}
                    className="contact-field"
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email"
                    required
                  />
                </div>

                <div className="form-group-clean">
                  <textarea 
                    id="contact-message" name="message" aria-label="Message" maxLength={10000}
                    className="contact-field contact-textarea"
                    rows={4} 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    placeholder="Message"
                    required
                  />
                </div>

                {error && <p className="contact-error" role="alert">{error}</p>}
                <div className="form-actions">
                  <button type="submit" disabled={sending} className="contact-submit-btn">
                    <span>{sending ? 'Sending…' : 'Send message'}</span>
                    <ArrowRight size={15} className="btn-arrow" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Architectural Typography Accent */}
          <div className="contact-right-col">
            <div className="contact-right-accent">
              <div className="accent-content-group">
                <div className="accent-vertical-line" aria-hidden="true" />
                <div className="accent-words">
                  <span className="text-light">RETURN.</span>
                  <span className="text-medium">REIMAGINE.</span>
                  <span className="text-bold">REALIZE.</span>
                </div>
              </div>
              <div className="accent-bottom-line" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
