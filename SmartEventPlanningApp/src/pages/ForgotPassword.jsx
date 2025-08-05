import React from "react";
import StepByStep from "../components/Elements/StepByStep";
import EmailCard from "../components/ForgotPassword/EmailCard";
import VerifyCodeCard from "../components/ForgotPassword/VerifyCodeCard";
import NewPasswordCard from "../components/ForgotPassword/NewPasswordCard";
import SuccessCard from "../components/ForgotPassword/SuccessCard";
import Loading from "../components/Elements/Loading";
import { useSelector } from "react-redux";

function ForgotPassword() {
  const { cardCount, loading } = useSelector((store) => store.forgotPassword);
  return (
    <>
      <div className="flex-column" style={{ height: "150px" }}>
        <StepByStep />
      </div>
      {cardCount === 1 && (
        <div
          className="flex-column"
          style={{ height: "150px", marginTop: "130px" }}
        >
          <EmailCard />
        </div>
      )}
      {cardCount === 2 && (
        <div
          className="flex-column"
          style={{ height: "150px", marginTop: "150px" }}
        >
          <VerifyCodeCard />
        </div>
      )}
      {cardCount === 3 && (
        <div
          className="flex-column"
          style={{ height: "150px", marginTop: "130px" }}
        >
          <NewPasswordCard />
        </div>
      )}
      {cardCount === 4 && (
        <div className="flex-column" style={{ marginTop: "60px" }}>
          <SuccessCard />
        </div>
      )}
      <Loading status={loading} />
    </>
  );
}

export default ForgotPassword;
