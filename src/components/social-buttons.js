import React from 'react'
import {Button} from 'react-bootstrap'

export default (props) => (
  <div className='social col-sm-5 text-left'>
    <Button href='/auth/facebook' className='btn btn-facebook'>Sign up with Facebook</Button>
    <Button href='/auth/twitter' className='btn btn-twitter'>Sign up with Twitter</Button>
    <Button href='/auth/google' className='btn btn-google'>Sign up with Google</Button>
  </div>
)
