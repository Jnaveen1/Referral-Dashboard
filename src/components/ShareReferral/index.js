import "./index.css";

const ShareReferral = ({ referral }) => {
  if (!referral) {
    return null;
  }

  const { link, code } = referral;

  const copyToClipboard = text => {
    navigator.clipboard.writeText(text);
    alert("Copied Successfully!");
  };

  return (
    <section className="share-section">
      <h2>Refer friends and earn more</h2>

      <div className="share-card">

        <div className="share-item">
          <label>Your Referral Link</label>

          <div className="copy-container">
            <input
              type="text"
              value={link}
              readOnly
            />

            <button
              type="button"
              onClick={() => copyToClipboard(link)}
            >
              Copy
            </button>
          </div>
        </div>

        <div className="share-item">
          <label>Your Referral Code</label>

          <div className="copy-container">
            <input
              type="text"
              value={code}
              readOnly
            />

            <button
              type="button"
              onClick={() => copyToClipboard(code)}
            >
              Copy
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ShareReferral;