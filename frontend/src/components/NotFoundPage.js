import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div>
      <h4>
        404 Page Not Found
      </h4>
      <Link to='/'> Go back to homepage </Link>
    </div>
  )
}

export default withRouter(NotFoundPage)
