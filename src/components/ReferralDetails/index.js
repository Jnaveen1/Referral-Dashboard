import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import Cookies from "js-cookie";

import Navbar from "../Navbar";

import "./index.css";

const ReferralDetails = () => {
  const {id} = useParams();

  const [referral, setReferral] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const token = Cookies.get("jwt_token");

      const response = await fetch(
        `https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals?id=${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        let referralData = null;

        // API may return a single object
        if (data.data && !Array.isArray(data.data)) {
          referralData = data.data;
        }

        // API may return referrals array
        if (
          data.data &&
          data.data.referrals &&
          data.data.referrals.length > 0
        ) {
          referralData = data.data.referrals.find(
            each => String(each.id) === id
          );
        }

        if (referralData) {
          setReferral(referralData);
        } else {
          setError("Referral not found");
        }
      } else {
        setError(data.message || "Referral not found");
      }
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  }, [id]);

  const formatDate = date =>
    date.replaceAll("-", "/");

  const formatProfit = profit =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(profit);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error || !referral) {
    return (
      <>
        <Navbar />

        <div className="details-container">
          <h1>Referral not found</h1>

          <Link to="/" className="back-link">
            ← Back to dashboard
          </Link>
        </div>

      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="details-container">
        <h1>Referral Details</h1>

        <h2>{referral.name}</h2>

        <div className="details-card">
          <div className="detail-row">
            <span>Referral ID</span>
            <span>{referral.id}</span>
          </div>

          <div className="detail-row">
            <span>Service Name</span>
            <span>{referral.serviceName}</span>
          </div>

          <div className="detail-row">
            <span>Date</span>
            <span>{formatDate(referral.date)}</span>
          </div>

          <div className="detail-row">
            <span>Profit</span>
            <span>{formatProfit(referral.profit)}</span>
          </div>
        </div>

        <Link to="/" className="back-link">
          ← Back to dashboard
        </Link>
      </main>

    </>
  );
};

export default ReferralDetails;