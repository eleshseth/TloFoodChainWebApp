import React, { useState } from 'react';
import './Contact.css';
import { assets } from '../../assets/assets';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className='contact-container' id='contact'>
      <div className='contact-left'>
        <h2>Get in Touch</h2>
        <p>We'd love to hear from you! Send us a message.</p>

        <div className='contact-info'>
          <div className='contact-item'>
            <img src={assets.location} alt='location' />
            <div>
              <h3>Address</h3>
              <p>
                Pioneer Complex, 12/26, Plot Alpha, Sahibabad Industrial Area
                Site 4, Sahibabad, Ghaziabad, Uttar Pradesh 201010
              </p>
            </div>
          </div>

          <div className='contact-item'>
            <img src={assets.mobile} alt='phone' />
            <div>
              <h3>Phone</h3>
              <p>+91 98765 43210</p>
            </div>
          </div>

          <div className='contact-item'>
            <img src={assets.email} alt='email' />
            <div>
              <h3>Email</h3>
              <p>info@tlofoodchain.com</p>
            </div>
          </div>
        </div>

        <div className='social-links'>
          <a href='#'>
            <img src={assets.facebook} alt='Facebook' />
          </a>
          <a href='#'>
            <img src={assets.instagram} alt='Instagram' />
          </a>
          <a href='#'>
            <img src={assets.twitter} alt='Twitter' />
          </a>
        </div>
      </div>

      <div className='contact-right'>
        <form onSubmit={handleSubmit}>
          <div className='form-row'>
            <input
              type='text'
              placeholder='Your Name'
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
            <input
              type='email'
              placeholder='Your Email'
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <input
            type='text'
            placeholder='Subject'
            value={formData.subject}
            onChange={(e) =>
              setFormData({ ...formData, subject: e.target.value })
            }
            required
          />
          <textarea
            placeholder='Your Message'
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required></textarea>
          <button type='submit'>Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
