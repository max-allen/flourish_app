import React, { useState } from 'react'
import styled from 'styled-components'
import './App.css'
import AudioPlayer from 'material-ui-audio-player'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import { callApi } from './api'

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`

const Avatar = styled.img`
  width: ${p => (p.small ? '50px' : '100px')};
  border: 5px solid #000000;
  border-radius: ${p => p.small && '60px'};
  margin-right 20px;
`
const StyledCard = styled(Card)`
  padding: 1rem;
`

const ShowHeader = styled.div`
  display: flex;
  align-items: center;
`

const EpisodeCell = styled.button`
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-left: 0;
  border-right: 0;
  border-bottom: 0;
  text-align: left;
  background-color: transparent;

  &:hover {
    border-radius: 3px;
    cursor: pointer;
    background-color: #29b6f6;
    color: #ffffff;
  }
`

export const App = () => {
  const [url, setUrl] = useState('')
  const [data, setData] = useState([])
  const [selected, setSelected] = useState(null)

  const changeHandler = e => setUrl(e.target.value)

  const clickHandler = async () => {
    const resp = await callApi({ method: 'post', body: { url } })
    setData(current => [...current, resp.data])
  }

  const [initialShow] = data
  const initialItem = initialShow && initialShow.items[0]

  return (
    <Layout>
      <StyledCard>
        <Input onChange={changeHandler} />
        <CardActions>
          <Button
            color='primary'
            variant='outlined'
            size='medium'
            onClick={clickHandler}
          >Confirm Quote
          </Button>

        </CardActions>
        { initialItem && (
        <Box mt={3} mb={3}>
          <AudioPlayer src={initialItem.attachments[0].url} />
        </Box>
        )}
        <Typography variant='h4'>Library</Typography>
        { data.map(show => {
          const listClickHandler = () => {
            setSelected(show)
          }
          return (
            <EpisodeCell onClick={listClickHandler}>
              <ShowHeader>
                <Avatar small src={show.icon} alt='avatar' />
                <Typography variant='subtitle1'>{show.title}</Typography>
              </ShowHeader>
            </EpisodeCell>
          )
        })}
      </StyledCard>

      <StyledCard>
        { selected && (
          <div key={selected.version}>
            <ShowHeader>
              <Avatar src={selected.icon} alt='avatar' />
              <Typography variant='h5'>
                {selected.title}
              </Typography>
            </ShowHeader>
            <Typography variant='subtitle1'>
              {selected.description}
            </Typography>
          </div>
        )}
        <hr />
        <Typography variant='h5'>Episodes</Typography>
        { selected && selected.items.map(item => (
          <EpisodeCell key={item.id}>
            <Typography variant='h6'>
              {item.title}
            </Typography>
            <Typography>
              {item.content_text}
            </Typography>
          </EpisodeCell>
        ))}
      </StyledCard>

      <StyledCard>
        <Typography variant='h4'>
          Playlist
        </Typography>
      </StyledCard>
    </Layout>
  )
}

