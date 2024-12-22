import Addlink from '@/components/admin/addlink'
import ViewRental from '@/components/viewrental'
import React from 'react'

const Page = ({params}) => {
  return (
    <>
    <div style={{
        backgroundColor: "black",
        padding: "20px",
        color: "white"
    }}>Rendered Look         <Addlink linkpath={`/admin/rentals/${params.rvid}/images`} text={"Upload Images"} />
</div>
     <ViewRental params={params} />
    </>
   
  )
}

export default Page