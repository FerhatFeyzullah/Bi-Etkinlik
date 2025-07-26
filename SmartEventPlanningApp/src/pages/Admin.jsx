import React from "react";
import { useParams } from "react-router-dom";

function Admin() {
  const { userId } = useParams();
  return <div>Admin{userId}</div>;
}

export default Admin;
