import React, { useEffect, useState } from "react";
import "./Plans.css";
import ElectricBorder from "../components/ElectricBorder";
import { API } from "../api"; // path adjust

export default function Plans() {
  const [dbPlans, setDbPlans] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/plans`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setDbPlans(data))
      .catch((err) => console.log(err));
  }, []);

  const getPrice = (duration, type) => {
    const plan = dbPlans.find((p) => p.duration === duration);
    if (!plan) return "...";

    if (type === "boys") return plan.boysPrice;
    if (type === "girls") return plan.girlsPrice;
    if (type === "couple") return plan.couplePrice;
  };

  const allPlans = [
    {
      title: "Men's Plans",
      type: "boys",
      plans: [
        {
          name: "MONTHLY",
          duration: "1 Month",
          features: [
            "Gym Access",
            "Cardio Area",
            "Locker Facility",
            "2 Hours / Day",
          ],
        },
        {
          name: "QUARTERLY",
          duration: "3 Months",
          popular: true,
          features: [
            "Savings (Profit): ₹600",
            "Personal Trainer Guidance",
            "Diet Consultation",
            "4 Hours / Day",
          ],
        },
        {
          name: "SEMI-ANNUAL",
          duration: "6 Months",
          features: [
            "Savings (Profit): ₹1700",
            "Unlimited Access",
            "Supplement Discount",
            "Priority Support",
          ],
        },
        {
          name: "ANNUALLY",
          duration: "1 Year",
          features: [
            "Savings (Profit): ₹4400",
            "Free PT Session",
            "Free Nutrition Plan",
            "Free Gym Merchandise",
          ],
        },
      ],
    },

    {
      title: "Women's Plans",
      type: "girls",
      plans: [
        {
          name: "MONTHLY",
          duration: "1 Month",
          features: ["Gym Access", "Cardio", "Locker", "Trainer Support"],
        },
        {
          name: "QUARTERLY",
          duration: "3 Months",
          popular: true,
          features: [
            "Savings (Profit): ₹600",
            "Zumba Access",
            "Flexible Timing",
            "Trainer Support",
          ],
        },
        {
          name: "SEMI-ANNUAL",
          duration: "6 Months",
          features: [
            "Savings (Profit): ₹1300",
            "Unlimited Access",
            "Supplement Discount",
            "Priority Support",
          ],
        },
        {
          name: "ANNUALLY",
          duration: "1 Year",
          features: [
            "Savings (Profit): ₹3600",
            "Free PT Session",
            "Free Nutrition Plan",
            "Merchandise",
          ],
        },
      ],
    },

    {
      title: "Couple / Partner Plans",
      type: "couple",
      plans: [
        {
          name: "MONTHLY",
          duration: "1 Month",
          features: [
            "Access for 2",
            "Cardio + Weights",
            "Locker",
            "Flexible Timing",
          ],
        },
        {
          name: "QUARTERLY",
          duration: "3 Months",
          popular: true,
          features: [
            "Savings (Profit): ₹900",
            "Trainer Guidance",
            "Diet Help",
            "Extended Hours",
          ],
        },
        {
          name: "SEMI-ANNUAL",
          duration: "6 Months",
          features: [
            "Savings (Profit): ₹2300",
            "Unlimited Access",
            "Priority Support",
            "Discounts",
          ],
        },
        {
          name: "ANNUALLY",
          duration: "1 Year",
          features: [
            "Savings (Profit): ₹7600",
            "Free PT",
            "Nutrition Plan",
            "Merchandise",
          ],
        },
      ],
    },
  ];

  return (
    <div className="plans-section">
      <div className="plans-header">
        <h2 className="plans-title">Choose Your Gym Membership</h2>
        <p className="plans-subtitle">
          Train hard today. Become stronger tomorrow.
        </p>
      </div>

      {allPlans.map((group, gIndex) => (
        <div key={gIndex} className="plan-group">
          <h2 className="group-title">{group.title}</h2>

          <div className="plans-grid">
            {group.plans.map((plan, index) =>
              plan.popular ? (
                <ElectricBorder key={index} color="#1b8a3b" borderRadius={24}>
                  <div className="plan-card popular-card">
                    <span className="popular-badge">Most Popular</span>

                    <div className="card-content">
                      <h3 className="plan-name">{plan.name}</h3>

                      <div className="plan-price">
                        <span className="currency">₹</span>
                        <span className="amount">
                          {getPrice(plan.duration, group.type)}
                        </span>
                      </div>

                      <p className="plan-duration">{plan.duration}</p>

                      <ul className="plan-features">
                        {plan.features.map((f, i) => (
                          <li key={i}>
                            <span className="check">✓</span> {f}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button className="plan-button popular-btn">
                      Join Now
                    </button>
                  </div>
                </ElectricBorder>
              ) : (
                <div key={index} className="plan-card">
                  <div className="card-content">
                    <h3 className="plan-name">{plan.name}</h3>

                    <div className="plan-price">
                      <span className="currency">₹</span>
                      <span className="amount">
                        {getPrice(plan.duration, group.type)}
                      </span>
                    </div>

                    <p className="plan-duration">{plan.duration}</p>

                    <ul className="plan-features">
                      {plan.features.map((f, i) => (
                        <li key={i}>
                          <span className="check">✓</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button className="plan-button">Join Now</button>
                </div>
              ),
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
