import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import SocialButtons from './social-buttons'
import { reduxForm } from 'redux-form'
import {Input, Button} from 'react-bootstrap'
import { pushState } from 'redux-router'

const fields = ['username', 'password']

const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }

  if (!values.password) {
    errors.password = 'Required'
  }
  return errors
}

@reduxForm({form: 'login', fields, validate})
export default class Login extends React.Component {
  static propTypes = {
    actions: PropTypes.object,
    dispatch: PropTypes.func,
    fields: PropTypes.object,
    modal: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    user: PropTypes.object
  }
  logIn = () => {
    const {fields: {username, password}} = this.props
    return this.props.actions.logIn({
      username: username.value,
      password: password.value
    })
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.user.id !== nextProps.user.id) {
      this.props.dispatch(pushState(null, '/'))
    }
  }
  render () {
    const {fields: {username, password}, submitting} = this.props
    return (
      <div className='modal-padding'>
        <h2 className='col-sm-12'>Start creating today! Sign up below.</h2>
        <div>
          <SocialButtons />
          <div className='col-sm-7'>
            <form ref='loginForm' onSubmit={this.props.handleSubmit(this.logIn)}>
              <Input type='text' {...username} placeholder='Username'/>
              <Input type='password' {...password} placeholder='Password'/>
              <Button bsStyle='primary' block disabled={submitting} type='submit'>Log In</Button>
            </form>
            <div>
              <Link to='/forgot' state={{modal: true}}>I forgot my password.</Link>
            </div>
            <div>
              Don't have an account? <Link to='/signup' state={{modal: true}}>Sign up</Link>.
            </div>
          </div>
        </div>
      </div>
    )
  }
}
