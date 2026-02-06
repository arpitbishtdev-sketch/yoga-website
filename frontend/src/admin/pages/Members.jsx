import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { API } from "../../api";

export default function Members() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/members`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setMembers(data));
  }, []);

  return (
    <AdminLayout>
      <h2>All Members</h2>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Gym</th>
            <th>Status</th>
            <th>Start</th>
            <th>Expiry</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m._id}>
              <td>{m.name}</td>
              <td>{m.gym}</td>
              <td>{m.paymentStatus}</td>
              <td>
                {m.planStart ? new Date(m.planStart).toDateString() : "-"}
              </td>
              <td>
                {m.planExpiry ? new Date(m.planExpiry).toDateString() : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
