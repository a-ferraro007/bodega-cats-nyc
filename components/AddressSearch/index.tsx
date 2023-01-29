import React, { useState } from 'react'
import Dropdown from './Dropdown'
import AddressSearchBar from './Input'

const AddressSearch = () => {
  const [data, setData] = useState()
  return (
    <div className="flex-grow relative">
      <AddressSearchBar setData={setData} />
      <Dropdown data={data} />
    </div>
  )
}

export default AddressSearch
