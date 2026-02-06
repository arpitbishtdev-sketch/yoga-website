import ScrollStack, { ScrollStackItem } from "../components/ScrollStack";
import "./WhatWeOffer.css";

import gymImg from "../assets/WWO/gym.jpg";
import yogaImg from "../assets/WWO/yoga.jpg";
import caleImg from "../assets/WWO/cale.png";
import cardioImg from "../assets/WWO/cardio.png";
import ptImg from "../assets/WWO/pt.png";
import commImg from "../assets/WWO/comm.png";

function WhatWeOffer() {
  return (
    <section className="offer-section">
      <h2 className="offer-title">What We Offer</h2>
      <ScrollStack className="stack-container">
        <ScrollStackItem>
          <div
            className="offer-card"
            style={{
              backgroundImage: `url(${gymImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "white",
              position: "relative",
              // overflow: "hidden",
            }}
          >
            {/* dark overlay so text is readable */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(99, 94, 94, 0.45)",
                borderRadius: "40px",
              }}
            />

            <div style={{ position: "relative", zIndex: 2 }}>
              <h3>Muscle Training</h3>
              <p style={{ color: "green", fontWeight: "bold" }}>
                Hypertrophy focused weight training with progressive overload
                plans.
              </p>
            </div>
          </div>
        </ScrollStackItem>

        <ScrollStackItem>
          <div
            className="offer-card"
            style={{
              backgroundImage: `url(${yogaImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "white",
              position: "relative",
              // overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(99, 94, 94, 0.45)",
                borderRadius: "40px",
              }}
            />
            <div style={{ position: "relative", zIndex: 2 }}>
              <h3>Yoga</h3>
              <p style={{ color: "green", fontWeight: "bold" }}>
                Improve flexibility, posture, and injury resistance.
              </p>
            </div>
          </div>
        </ScrollStackItem>

        <ScrollStackItem>
          <div
            className="offer-card"
            style={{
              backgroundImage: `url(${caleImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "white",
              position: "relative",
              // overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(99, 94, 94, 0.45)",
                borderRadius: "40px",
              }}
            />
            <div style={{ position: "relative", zIndex: 2 }}>
              <h3>Calisthenics</h3>
              <p style={{ color: "green", fontWeight: "bold" }}>
                Master bodyweight strength and control.
              </p>
            </div>
          </div>
        </ScrollStackItem>

        <ScrollStackItem>
          <div
            className="offer-card"
            style={{
              backgroundImage: `url(${cardioImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "white",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(99, 94, 94, 0.45)",
                borderRadius: "40px",
              }}
            />
            <div style={{ position: "relative", zIndex: 2 }}>
              <h3>Zumba & Cardio</h3>
              <p style={{ color: "green", fontWeight: "bold" }}>
                High energy fat-burning sessions with fun group workouts.
              </p>
            </div>
          </div>
        </ScrollStackItem>

        <ScrollStackItem>
          <div
            className="offer-card"
            style={{
              backgroundImage: `url(${ptImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "white",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(99, 94, 94, 0.45)",
                borderRadius: "40px",
              }}
            />
            <div style={{ position: "relative", zIndex: 2 }}>
              <h3>Personal Coaching</h3>
              <p style={{ color: "green", fontWeight: "bold" }}>
                Custom diet plans, personal training, and progress tracking.
              </p>
            </div>
          </div>
        </ScrollStackItem>

        <ScrollStackItem>
          <div
            className="offer-card"
            style={{
              backgroundImage: `url(${commImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "white",
              position: "relative",
              // overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(99, 94, 94, 0.45)",
                borderRadius: "40px",
              }}
            />
            <div style={{ position: "relative", zIndex: 2 }}>
              <h3>Community & Discipline</h3>
              <p style={{ color: "green", fontWeight: "bold" }}>
                Train with like-minded people and build lifelong consistency.
              </p>
            </div>
          </div>
        </ScrollStackItem>
      </ScrollStack>
    </section>
  );
}

export default WhatWeOffer;
