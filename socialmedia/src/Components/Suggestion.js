import React from 'react'

const Suggestions = ({result}) => {
  const options = result.map(r => (
    <p>
      {r.name}
    </p>
  ))
  return <div>{options}</div>
}

export default Suggestions