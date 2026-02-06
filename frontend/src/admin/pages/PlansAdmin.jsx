import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { API } from "../../api";

export default function PlansAdmin() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/plans`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setPlans(data));
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...plans];
    updated[index][field] = value;
    setPlans(updated);
  };

  const handleSave = async (plan) => {
    await fetch(`${API}/api/plans/${plan._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(plan),
    });

    alert("Updated!");
  };

  return (
    <AdminLayout>
      <div style={{ padding: "40px" }}>
        <h2>Edit Gym Plans Pricing</h2>

        {plans.map((plan, index) => (
          <div
            key={plan._id}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
            <h3>{plan.duration}</h3>

            <label>Boys Price:</label>
            <input
              type="number"
              value={plan.boysPrice}
              onChange={(e) => handleChange(index, "boysPrice", e.target.value)}
            />

            <br />
            <br />

            <label>Girls Price:</label>
            <input
              type="number"
              value={plan.girlsPrice}
              onChange={(e) =>
                handleChange(index, "girlsPrice", e.target.value)
              }
            />

            <br />
            <br />

            <label>Couple Price:</label>
            <input
              type="number"
              value={plan.couplePrice}
              onChange={(e) =>
                handleChange(index, "couplePrice", e.target.value)
              }
            />

            <br />
            <br />

            <button onClick={() => handleSave(plan)}>Save</button>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
