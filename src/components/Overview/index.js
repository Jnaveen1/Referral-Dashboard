import OverviewCard from "../OverviewCard";
import "./index.css";

const Overview = ({ metrics }) => {
  return (
    <section className="overview-section">
      <h2>Overview</h2>

      <div className="overview-container">
        {metrics.map(metric => (
          <OverviewCard
            key={metric.id}
            metric={metric}
          />
        ))}
      </div>
    </section>
  );
};

export default Overview;