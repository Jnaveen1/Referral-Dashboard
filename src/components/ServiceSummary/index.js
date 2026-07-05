import "./index.css";

const ServiceSummary = ({ serviceSummary }) => {
  if (!serviceSummary) {
    return null;
  }

  const {
    service,
    yourReferrals,
    activeReferrals,
    totalRefEarnings,
  } = serviceSummary;

  return (
    <section className="service-summary-section">
      <h2>Service Summary</h2>

      <div className="summary-card">

        <div className="summary-row">
          <p className="label">Service</p>
          <p>{service}</p>
        </div>

        <div className="summary-row">
          <p className="label">Your Referrals</p>
          <p>{yourReferrals}</p>
        </div>

        <div className="summary-row">
          <p className="label">Active Referrals</p>
          <p>{activeReferrals}</p>
        </div>

        <div className="summary-row">
          <p className="label">Total Ref. Earnings</p>
          <p>{totalRefEarnings}</p>
        </div>

      </div>
    </section>
  );
};

export default ServiceSummary;