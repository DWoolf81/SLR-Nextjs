'use server'

const { default: Location } = require("@/models/locations");



const TestRv = async () => {

 const data = await Location.find();

 return JSON.parse(JSON.stringify(data))

}





export default  TestRv