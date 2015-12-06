import React, { PropTypes } from 'react'

class ArtSquare extends React.Component {
  static propTypes = {
    artwork: PropTypes.object
  }
  render () {
    const {title, username} = this.props.artwork
    return (
      <div className='artwork col-md-5ths col-sm-4 col-xs-6'>
        <div className='dummy' />
        <div className='info'>
          <div className='title'>{title}</div>
          <div className='username'>{username}</div>
        </div>
      </div>
    )
  }
}

export default ArtSquare
