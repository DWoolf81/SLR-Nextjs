const Map = ({ link }) => {
  console.log("The link now", link === undefined, link);

  const showMap = link?.map != "" && link?.map !== undefined ? true : false;

  return (
    <>
      {showMap ? (
        <>
          <div style={{
            display: "flex",
            alignItems: "center",
            margin: "5px 0px"
          }}>
            <p>
              <span className="material-symbols-outlined">home_pin</span>
              
            </p>
            <p>: {link?.site}</p>
          </div>

          <iframe
            src={link.map}
            width="100%"
            height="100%"
            style={{ border: "0", minHeight: "200px" }}
            allowfullscreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "var(--button-bg-color)",
            backgroundColor: "beige",
            padding: "30px",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <p>No Location</p>
            <p>Call for camp ground availibility</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Map;
