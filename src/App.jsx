import React from 'react'
import styled from 'styled-components'
import './App.css'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`

export const App = () => {
  const clickHandler = () => {}
  return (
    <Layout>
      <Card style={{ height: '100%' }}>
        <Input />
        <CardActions>
          <Button
            color='primary'
            variant='outlined'
            size='medium'
            onClick={clickHandler}
          >Confirm Quote
          </Button>
        </CardActions>
        <Button />
      </Card>
    </Layout>
  )
}

