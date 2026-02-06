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
                background: "rgba(0,0,0,0.65)",
                borderRadius: "40px",
              }}
            />

            <div style={{ position: "relative", zIndex: 2 }}>
              <h3>Hatha Yoga</h3>
              <p>
                Foundational postures to improve flexibility, posture and body
                awareness.
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
                background: "rgba(0,0,0,0.65)",
                borderRadius: "40px",
              }}
            />
            <div style={{ position: "relative", zIndex: 2 }}>
              <h3>Meditation</h3>
              <p>
                Guided meditation sessions for mental clarity and inner peace.
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
                background: "rgba(0,0,0,0.65)",
                borderRadius: "40px",
              }}
            />
            <div style={{ position: "relative", zIndex: 2 }}>
              <h3>Pranayama & Breathing</h3>
              <p>
                Learn breathing techniques to calm the mind and increase lung
                capacity.
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
                background: "rgba(0,0,0,0.65)",
                borderRadius: "40px",
              }}
            />
            <div style={{ position: "relative", zIndex: 2 }}>
              <h3>Power Yoga</h3>
              <p>Dynamic flows that build strength, stamina and balance.</p>
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
                background: "rgba(0,0,0,0.65)",
                borderRadius: "40px",
              }}
            />
            <div style={{ position: "relative", zIndex: 2 }}>
              <h3>Beginner Friendly Batches</h3>
              <p>
                Special batches designed for newcomers with personal guidance.
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
                background: "rgba(0,0,0,0.65)",
                borderRadius: "40px",
              }}
            />
            <div style={{ position: "relative", zIndex: 2 }}>
              <h3>Community & Mindfulness</h3>
              <p>
                Practice with like-minded people in a calm and positive
                environment.
              </p>
            </div>
          </div>
        </ScrollStackItem>
      </ScrollStack>
    </section>
  );
}

export default WhatWeOffer;
