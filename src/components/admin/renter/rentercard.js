import React from 'react'
import Addlink from '../addlink'
import { formatPhoneNumber } from '@/lib/admin_actions'

const RenterCard = ({ renter }) => {
  return (
    <>
        <span className="material-symbols-outlined">face_6</span>
        <div className={"admin-header-div"}>
          <h2>Personal</h2>
          <Addlink
            className="al-green-bg"
            linkpath={`/admin/renters/${renter.rid}/edit`}
            text={"Edit"}
          />
        </div>
        <div className='renter-info-div'>

            <div className='renter-image-div'>
                <div className='renter-image'>
                    <p>Image here</p>
                </div>

            </div>
            <div className='renter-info'>
                <p>
          Name: <span>{renter.name}</span>
        </p>
        <p>
          Email: <span>{renter.email}</span>
        </p>
        <p>
          Location:{" "}
          <span>{`${renter.location.city}, ${renter.location.state} `}</span>
        </p>
        <p>
          DOB: <span>{renter.dob}</span>
        </p>
        <p>
          Phone: <span>{formatPhoneNumber(renter.phone)}</span>
        </p>
        <p>
          DL: <span>{renter.dl}</span>
        </p>
            </div>
 

        </div>

       
    </>
  )
}

export default RenterCard