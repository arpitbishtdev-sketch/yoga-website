import EnquiryForm from "../components/EnquiryForm";
import "./Contact.css";

export default function Contact() {
  return (
    <section className="contact-page">
      <div className="contact-container">
        {/* LEFT — FORM */}
        <div className="contact-left">
          <EnquiryForm />
        </div>

        {/* RIGHT — INFO + MAP */}
        <div className="contact-right">
          <div className="contact-info-card">
            <h2>Get in touch</h2>

            <div className="info-block">
              <h4>Visit us</h4>
              <p>Your City, India</p>
            </div>

            <div className="info-block">
              <h4>Phone</h4>
              <p>+91 8383804987</p>
            </div>

            <div className="info-block">
              <h4>Email</h4>
              <p>ironparadisegym@gmail.com</p>
            </div>
          </div>

          <div className="contact-map">
            <iframe
              title="gym-map"
              src="https://maps.google.com/maps?q=india&t=&z=13&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
