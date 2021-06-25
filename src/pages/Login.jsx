import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Spinner } from '../components'
import { loginUser } from '../utils/store/actions'

export const Login = () => {
  const store = useSelector(({ users: { loading, results } }) => ({ loading, results }))
  const { loading, results } = store

  const dispatch = useDispatch()

  const submitHandler = e => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value

    dispatch(loginUser(email, password))
  }

  if (results) return <Redirect to='/' />

  if (loading) return <Spinner color='primary' />

  return (
    <Container component='main' maxWidth='xs'>
      <Typography component='h1' variant='h5'>
        Login
      </Typography>
      <form onSubmit={submitHandler}>
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          name='email'
          label='Email'
          type='email'
          id='email'
          autoComplete='current-password'
        />
        <TextField
          variant='outlined'
          margin='normal'
          required
          fullWidth
          name='password'
          label='Password'
          type='password'
          id='password'
          autoComplete='current-password'
        />
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='primary'
        >
          Login
        </Button>
      </form>
    </Container>
  )
}
