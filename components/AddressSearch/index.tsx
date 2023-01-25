import React, { useState } from 'react'
import Dropdown from './Dropdown'
import AddressSearchBar from './Input'

const AddressSearch = () => {
  const [data, setData] = useState()
  return (
    <div className="flex-grow relative mr-3 lg:mr-28">
      <AddressSearchBar setData={setData} />
      <Dropdown data={data} />
    </div>
  )
}

export default AddressSearch
