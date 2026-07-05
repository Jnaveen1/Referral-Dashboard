import {useEffect, useState} from "react";
import Cookies from "js-cookie";

import Navbar from "../Navbar";
import Overview from "../Overview";
import ServiceSummary from "../ServiceSummary";
import ShareReferral from "../ShareReferral";
import ReferralTable from "../ReferralTable";

import "./index.css";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");

useEffect(() => {
  const getDashboardData = async () => {
    try {
      const token = Cookies.get("jwt_token");

      const response = await fetch(
        `https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api/referrals?search=${search}&sort=${sort}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setDashboardData(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  getDashboardData();
}, [search, sort]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return (
      <div>
        <h2>{error}</h2>
      </div>
    );
  }

  console.log(dashboardData);

  return (
    <>
      <Navbar />

      <main className="dashboard-container">
        <h1>Referral Dashboard</h1>

        <p>
          Track your referrals, earnings, and partner activity in one place.
        </p>

        <Overview metrics={dashboardData?.metrics} />

        <ServiceSummary
          serviceSummary={dashboardData?.serviceSummary}
        />

        <ShareReferral
          referral={dashboardData?.referral}
        />

        <ReferralTable
            referrals={dashboardData?.referrals}
            search={search}
            setSearch={setSearch}
            sort={sort}
            setSort={setSort}
        />
      </main>

    </>
  );
};

export default Dashboard;