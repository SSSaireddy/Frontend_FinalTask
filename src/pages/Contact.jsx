import { useReducer } from "react";
import { Mail, MapPin, Phone, Clock, Send } from "lucide-react";
import PageIntro from "../components/PageIntro";
import { contactReducer, initialContactState } from "../reducers/contactReducer";
import { useToast } from "../context/ToastContext";

export default function Contact() {
  const [state, dispatch] = useReducer(contactReducer, initialContactState);
  const { showToast } = useToast();

  function handleSubmit(event) {
    event.preventDefault();
    const errors = {};
    if (state.values.name.trim().length < 2) errors.name = "Please enter at least 2 characters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.values.email.trim())) errors.email = "Enter a valid email address.";
    if (state.values.message.trim().length < 10) errors.message = "Message must be at least 10 characters.";
    dispatch({ type: "SET_ERRORS", errors });
    if (Object.keys(errors).length) return;
    dispatch({ type: "SUBMIT_SUCCESS" });
    showToast("Demo message validated. No email was sent.");
  }

  function fieldChange(event) {
    dispatch({ type: "FIELD_CHANGE", field: event.target.name, value: event.target.value });
  }

  return (
    <div className="container page-container">
      <PageIntro eyebrow="We would love to hear from you" title="Let's talk food." description="Questions, feedback or a special request? Send us a message using the demo form." />
      <div className="contact-layout"><aside className="contact-info"><h2>Come say hello</h2><p>We are happy to help with menu questions and general enquiries.</p><div className="contact-info-row"><span><MapPin/></span><div><strong>Visit us</strong><p>12 Food Street, Tirupati, Andhra Pradesh</p></div></div><div className="contact-info-row"><span><Phone/></span><div><strong>Call us</strong><p>+91 98765 43210</p></div></div><div className="contact-info-row"><span><Mail/></span><div><strong>Email</strong><p>hello@spiceroute.example</p></div></div><div className="contact-info-row"><span><Clock/></span><div><strong>Opening hours</strong><p>Every day · 11:00 AM – 10:00 PM</p></div></div><div className="contact-note">Sample contact details for the training assignment.</div></aside>
        <form className="contact-form" onSubmit={handleSubmit} noValidate><h2>Send a message</h2><p>Fields marked below are required.</p><label>Your name<input name="name" value={state.values.name} onChange={fieldChange} placeholder="Enter your name" /></label>{state.errors.name && <small className="field-error">{state.errors.name}</small>}<label>Email address<input name="email" type="email" value={state.values.email} onChange={fieldChange} placeholder="you@example.com" /></label>{state.errors.email && <small className="field-error">{state.errors.email}</small>}<label>Your message<textarea name="message" rows="5" value={state.values.message} onChange={fieldChange} placeholder="How can we help?" /></label>{state.errors.message && <small className="field-error">{state.errors.message}</small>}<button className="button button-primary" type="submit">Send message <Send size={16}/></button>{state.submitted && <p className="success-message">Your form passed validation. This demo does not send data to a server.</p>}</form>
      </div>
    </div>
  );
}
