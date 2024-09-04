import { findUserFromSession } from "@/app/lib/actions";
import Backbtn from "@/components/backbtn";
import React from "react";

const Moveout = async () => {
  const renter = await findUserFromSession();

  const date = new Date(renter.renting.moveout);
  console.log(date.toDateString());

  return (
    <>
      <Backbtn link="./" />
      <div className="acct-moveout-box">
        <div style={{ margin: "20px" }}>
          <div className="acct-moveout-date-box">
            <p style={{ margin: "20px" }}>Move-Out</p>
            {renter.renting.moveout ? (
              <>
                <p>
                  {new Date(renter.renting.moveout).toDateString()} at 3:00pm
                </p>
                <p style={{ fontSize: "12px", margin: "20px" }}>
                  If you would like to cancel or change your scheduled move-out
                  date, please call SLR at (713)222-2222
                </p>
              </>
            ) : (
              <p>--</p>
            )}
          </div>

          <article>
            {renter.renting.moveout ? (
              <p>
                You are sheduled to move out on the above date. Read below the
                details about move-out requirements
              </p>
            ) : (
              <p>
                Before you scheduled to move-out b please follow move-out rules
                below
              </p>
            )}

            <div>
              <ul>
                <li>
                  Please clean up your mess; wash dishes, sweep floor and take
                  out trash
                </li>
                <li>
                  If there are keys, turn them in or leave in lock box next to
                  rv
                </li>
                <li>
                  if there are any deposits, they will be refunded after
                  inspection of the property
                </li>
                <li>
                  Do not leave personal belongings in RV. SLR is not responsible
                  for lost items
                </li>
                <li>
                  Any amenities added to rv, leave them in RV and turned off if
                  possible
                </li>
                <li>
                  Leave bedding on bed. You do not have to make the bed before
                  you leave
                </li>
                <li>If you need a later move-out, please inform SLR</li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </>
  );
};

export default Moveout;
