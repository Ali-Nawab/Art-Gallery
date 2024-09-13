import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import './Contact.css';  // Assuming you're using the same CSS file

import { useForm as useHookForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import { useForm, ValidationError } from '@formspree/react';

const Contact = () => {
  // Yup schema for validation
  const schema = yup.object().shape({
    FirstName: yup.string().required("First Name is required"),
    LastName: yup.string().required("Last Name is required"),
    PhoneNo: yup.number().typeError('Phone No must be a number').required("Phone No is required"),
    Email: yup.string().email("Must be a valid email").required("Email is required"),
    Message: yup.string().required("Message is required")
  });

  // Using react-hook-form with yup validation
  const { register, handleSubmit, formState: { errors } } = useHookForm({
    resolver: yupResolver(schema)
  });

  // Formspree form setup
  const [state, handleSubmitFormspree] = useForm("xpwaerog");

  // On form submit, validate first and then submit to Formspree
  const onSubmit = async (data) => {
    // Send data to Formspree
    await handleSubmitFormspree({
      email: data.Email,
      message: data.Message,
    });
  };

  if (state.succeeded) {
    return <p>Thanks for getting in touch!</p>;
  }

  return (
    <section className="contact">
      <div className="section-title contact-title">
        <h2>Get in Touch</h2>
        <div className="underline team-underline contact-underline"></div>
      </div>
      <div className="section-center contact-center">
        <p className="contact-text">
          In the case of any kind of query, you can contact us freely. We will be happy to entertain you.
        </p>
        <div className="contact-info">
          {/* Contact Form */}
          <div className="contact1">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                className="control-form"
                placeholder="First Name"
                {...register("FirstName")}
              />
              <p>{errors.FirstName?.message}</p>

              <input
                type="text"
                className="control-form"
                placeholder="Last Name"
                {...register("LastName")}
              />
              <p>{errors.LastName?.message}</p>

              <input
                type="tel"
                className="control-form"
                placeholder="Phone No."
                {...register("PhoneNo")}
              />
              <p>{errors.PhoneNo?.message}</p>

              <input
                type="email"
                className="control-form"
                placeholder="Email"
                {...register("Email")}
              />
              <p>{errors.Email?.message}</p>

              <textarea
                cols="30"
                rows="10"
                className="control-form"
                placeholder="Message"
                {...register("Message")}
              ></textarea>
              <p>{errors.Message?.message}</p>

              <button className="btn contact-btn" type="submit" disabled={state.submitting}>
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="contact2">
            <div className="contact-info-box">
              <p>
                <span>Address:</span> <FaMapMarkerAlt className="icon" /> 1st Floor, Al-Madina Plaza, Anwar Chowk, Wah Cantt, Pakistan
              </p>
            </div>
            <div className="contact-info-box">
              <p>
                <span>Phone:</span> <FaPhoneAlt className="icon" /> +92 300 0000000
              </p>
            </div>
            <div className="contact-info-box">
              <p>
                <span>Email:</span> <FaEnvelope className="icon" /> alinawabkhan15@gmail.com
              </p>
            </div>
            <div className="contact-info-box">
              <p>
                <span>Get Social:</span> 
                <a href="#"><FaFacebook className="icon" /></a>
                <a href="#"><FaTwitter className="icon" /></a>
                <a href="#"><FaInstagram className="icon" /></a>
                <a href="#"><FaLinkedin className="icon" /></a>
                <a href="#"><FaYoutube className="icon" /></a>
              </p>
            </div>
            <div className="contact-info-box">
              <p>
                <span>Subscribe:</span>
              </p>
              <div className="subscribe">
                <form>
                  <input type="email" className="control-form" placeholder="Enter Email" />
                  <button className="btn subscribe-btn">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
