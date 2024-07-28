import "../css/account.css";
import Link from "next/link";
import Image from "next/image";

const AcountLayout = ({ children}) => {

  return (
    <div className="container">
      <div className="max-wid-1024 flex-dir-column">
        <div>
          <div className="acct-rv-top-box gap-20">
            <div>
              <div className="acct-rv-img">
                <Image
                  src="/assets/campers/00001/357354480_7354658054556968_7586703221745730716_n.jpg"
                  //src={imgSrc}
                  width={0}
                  height={0}
                  alt="2008 Fleetwood quantum 1"
                  style={{ width: "100%", height: "auto" }}
                  sizes="100vw"
                />
              </div>
            </div>
            <div style={{ width: "100%" }}>
              <article>
                <p className="acct-sub-head-p">current stay</p>
                <p className="acct-bold-head-p">RV-Name: ShotGv</p>
                <p>Tenant: <span>Darrell Woolfolk + 1</span></p>
              </article>
            </div>
            <div
              style={{
                padding: "0px 20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <p className="acct-bold-head-p">$856</p>
              <p className="acct-sub-head-p" style={{ margin: "-5px 0px 10px" }}>month</p>
              <Link className="acct-details-btn" href="#">Details</Link>
            </div>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};

export default AcountLayout;
