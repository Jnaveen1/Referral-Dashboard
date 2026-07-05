import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "./index.css";

const ReferralTable = ({referrals = [], search, setSearch, sort, setSort}) => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(
    referrals.length / ITEMS_PER_PAGE
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const endIndex = startIndex + ITEMS_PER_PAGE;

  const currentReferrals = referrals.slice(startIndex, endIndex);

  const navigate = useNavigate();

  useEffect(()=>{
      setCurrentPage(1);
    },[search,sort]);

  const onClickRow = id => {
    navigate(`/referral/${id}`);
  };

  const formatDate = date => date.replaceAll("-", "/");

  const formatProfit = profit =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(profit);

  return (
    <section className="table-section">
    <div className="table-header">

      <h2>All Referrals</h2>

      <div className="table-actions">

        <input
          type="search"
          placeholder="Name or service…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="sort-container">
          <label htmlFor="sort">
            Sort by date
          </label>

          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="desc">
              Newest first
            </option>

            <option value="asc">
              Oldest first
            </option>
          </select>
        </div>

      </div>

    </div>

      <table className="referral-table">

        <thead>
          <tr>
            <th>Name</th>
            <th>Service</th>
            <th>Date</th>
            <th>Profit</th>
          </tr>
        </thead>

        <tbody>

          {currentReferrals.map(referral => (
            <tr
              key={referral.id}
              onClick={() => onClickRow(referral.id)}
            >
              <td>{referral.name}</td>

              <td>{referral.serviceName}</td>

              <td>{formatDate(referral.date)}</td>

              <td>{formatProfit(referral.profit)}</td>

            </tr>
          ))}

        </tbody>

      </table>
      <div className="pagination-container">
        <p className="entries-text">
          Showing {startIndex + 1}–{Math.min(endIndex, referrals.length)} of {referrals.length} entries
        </p>
        <div className="pagination">

          <button onClick={() => setCurrentPage(currentPage-1)} disabled={currentPage===1}>Previous</button>

                {
                    [...Array(totalPages)].map((_,index)=>(
                        <button key={index}
                            className={currentPage===index+1 ? "active-page" : "" } onClick={()=>{ setCurrentPage(index+1) } }>
                            {index+1}
                        </button>
                    ))
                }

          <button onClick={()=> setCurrentPage(currentPage+1)} disabled={currentPage===totalPages}>Next</button>
        </div>

      </div>

    </section>
  );
};

export default ReferralTable;