
import React, { Suspense } from "react";

import Searchinventory from "@/components/searchinventory";
import Rvmapopener from "@/components/rvmapopener";
import Rvmappop from "@/components/rvmappop";
import Addon from "@/models/addons";


const Search = async ({ params, searchParams}) => {


  // CRUD Create Read Update Delete

  // Create
  await Addon.create({ aid: 5, name: "Dodo Bird", instock: true, desc: "No desc", rate: 100, image: null})

  const item = await Addon.findOne({ aid: 5})

  console.log("We found a item", item)


  // Update
  await Addon.updateOne({ name: "DooDoo Nelson"}, { name: "DooDoo McNelson"})

  //Delete
  await Addon.deleteOne({ aid: 5 })
  

  return (
    <div style={{ marginTop: "85px" }}>

      <Suspense>
      <Rvmapopener>
        <Rvmappop />
      </Rvmapopener>
      
      <Searchinventory search={searchParams} />

      </Suspense>
      
    </div>
  );
};

export default Search;
