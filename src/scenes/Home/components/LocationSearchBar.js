import React, { useState } from 'react'
import { FormControl } from 'react-bootstrap'
import Autocomplete from 'react-autocomplete'
import { locationUri } from '../../../commons/utils'

// eslint-disable-next-line react/prop-types
export default function LocationSearchBar ({ onSearch }) {
  const [selectedLocationName, setSelectedLocationName] = useState('')
  const [state, setState] = useState({
    loading: true,
    error: null,
    foundLocations: []
  })

  async function onChange (e) {
    const locationString = e.target.value
    setSelectedLocationName(locationString)
    if (locationString !== '') {
      const response = await fetch(
        `${locationUri}/search/?query=${locationString}`
      )
      response
        .json()
        .then((response) => {
          setState({
            loading: false,
            error: null,
            foundLocations: response.data
          })
        })
        .catch((e) => {
          setState({
            loading: false,
            error: e,
            foundLocations: []
          })
        })
    }
  }

  function onSelect (title) {
    setSelectedLocationName(title)
    // the AutoComplete doesn't export any function to get item properties that don't display
    // so we need to find item by displayed value
    const selectedLocation = state.foundLocations.find((location) => {
      return location.title === title
    })
    onSearch(selectedLocation.woeid)
  }

  return (
    <React.Fragment>
      <Autocomplete
        items={state.foundLocations}
        getItemValue={(item) => item.title}
        renderInput={(props) => {
          return (
            <FormControl
              name="search"
              type="text"
              placeholder="Type location..."
              className="mr-sm-2"
              {...props}
            />
          )
        }}
        renderItem={(item, highlighted) => (
          <div
            key={item.id}
            style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
          >
            {item.title}
          </div>
        )}
        value={selectedLocationName}
        onChange={onChange}
        onSelect={onSelect}
      />
      {state.error && <span className="text-danger">{state.error}</span>}
      {state.loading && <span className="text-info">loading...</span>}
    </React.Fragment>
  )
}
