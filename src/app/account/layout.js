import "../css/account.css";
import Link from "next/link";
import Image from "next/image";
import { findUserFromSession, getRv } from "@/lib/actions";
import Paymenthead from "@/components/paymenthead";

const AcountLayout = async ({ children }) => {
  const renter = await findUserFromSession();

  if (!renter) toda = true;

  let rv = false;

  if (renter.renting) rv = await getRv(renter.renting.rv);
  console.log("Checking");
  let rate = renter.renting.rate;

  return (
    <>
      <div className="max-wid-1024 flex-dir-column pt-75">
        {rv == "corn" ? (
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

              <div
                style={{ width: "100%", display: "flex", alignItems: "center" }}
              >
                <article>
                  <p className="acct-sub-head-p">Renting</p>
                  <p className="acct-bold-head-p">{rv.name}</p>
                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span class="material-symbols-outlined green">group</span>{" "}
                    <span>
                      {renter.name} + {renter.renting.tenants}{" "}
                    </span>
                  </p>
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
                <p className="acct-bold-head-p">${rate}</p>
                <p
                  className="acct-sub-head-p"
                  style={{ margin: "-5px 0px 10px" }}
                >
                  month
                </p>
                <Link
                  className="acct-details-btn"
                  href={{
                    pathname: `/rental/${rv.rvid}`,
                  }}
                >
                  Details
                </Link>
              </div>
            </div>
            <Paymenthead />
          </div>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                height: "100px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p>Currently Not Renting</p>
            </div>
          </>
        )}

        <div className="acct-main-box">
          <div
            style={{
              width: "100%",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default AcountLayout;
