import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Files extends Component {
  render() {
    return (
      <ul>
        {this.props.files.map((post, i) => <li key={i}>{post.name}</li>)}
      </ul>
    )
  }
}

Files.propTypes = {
  files: PropTypes.array.isRequired
}
