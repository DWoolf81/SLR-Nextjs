import Addrental from "@/components/admin/addrental"
import Newrenter  from "@/components/admin/newrenterform"
import Renter from "@/models/renters"

const Page = async ({ params }) => {

    const renter = await Renter.findOne({ rid: params.rid })
    
    const json = JSON.parse(JSON.stringify(renter))

    console.log(json)


    return <Addrental edit={json} />
}

export default Page