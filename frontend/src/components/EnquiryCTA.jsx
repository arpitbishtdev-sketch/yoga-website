import { useNavigate } from "react-router-dom";
import { MdOutlineContactSupport } from "react-icons/md";
import "./EnquiryCTA.css";
import confusedImg from "../assets/homeImg/confused (2).png";

export default function EnquiryCTA() {
  const navigate = useNavigate();

  return (
    <section className="cta-section">
      <div className="cta-box">
        <div className="cta-content">
          <div className="cta-text">
            <h2>Have Questions About Our Yoga Classes?</h2>
            <p>
              Ask us anything about class timings, batches, instructors or
              plans. We’re happy to guide you.
            </p>

            <button className="cta-btn" onClick={() => navigate("/contact")}>
              <MdOutlineContactSupport size={22} />
              Send Enquiry
            </button>
          </div>

          <div className="cta-image">
            <img src={confusedImg} alt="confused" />
          </div>
        </div>
      </div>
    </section>
  );
}
