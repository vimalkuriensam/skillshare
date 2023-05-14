import React from "react";
import { useState } from "react";
import { Calendar } from "../../components";

const Dashboard = () => {
  const [checkboxValue, setCheckboxValue] = useState(false);
  return (
    <div>
      <Calendar />
    </div>
  );
};

export default Dashboard;
