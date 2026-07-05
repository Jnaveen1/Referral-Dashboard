import "./index.css";

const OverviewCard = ({ metric }) => {
  const { label, value } = metric;

  return (
    <div className="overview-card">
      <h2>{value}</h2>

      <p>{label}</p>
    </div>
  );
};

export default OverviewCard;