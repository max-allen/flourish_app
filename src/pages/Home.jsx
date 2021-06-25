import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import AudioPlayer from 'material-ui-audio-player'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import { DragDropContainer, DropTarget } from 'react-drag-drop-container'
import { addPodcast, addPlaylist } from '../utils/store/actions'
import { truncate } from '../utils/truncate'

const StyledCardActions = styled(CardActions)`
  padding-left: 0
`

const StyledInput = styled(Input)`
  width: 100%;
`

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

const hoverAndSelectedStyles = `
  border-radius: 3px;
  cursor: pointer;
  background-color: #29b6f6;
  color: #ffffff;
`

const EpisodeCell = styled.button`
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-left: 0;
  border-right: 0;
  border-bottom: 0;
  text-align: left;
  background-color: transparent;
  width: 100%; 
  ${p => p.selected && hoverAndSelectedStyles}

  &:hover {
    ${hoverAndSelectedStyles}
  }
`

const PlaylistSlot = styled.div`
  margin: 4rem 0;
  height: 8rem;
  border: 1px solid #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &:hover {
    ${hoverAndSelectedStyles}
  }
`

export const Home = () => {
  const [url, setUrl] = useState('')
  const [selected, setSelected] = useState(null)
  const [selectedEpisode, setSelectedEpisode] = useState(null)

  const store = useSelector(({
    playlists: { results: playlist },
    podcasts: { results },
    users: { results: userDetails }
  }) => ({ results, userDetails, playlist }))

  const { results, userDetails, playlist } = store

  const dispatch = useDispatch()

  const changeHandler = e => setUrl(e.target.value)

  const clickHandler = () => {
    dispatch(addPodcast(url, userDetails.id))
  }

  const playlistSlots = Array.from({ length: 10 }, (el, idx) => idx + 1)

  return (
    <Layout>
      <StyledCard>
        <StyledInput onChange={changeHandler} />
        <StyledCardActions>
          <Button
            color='primary'
            variant='outlined'
            size='medium'
            onClick={clickHandler}
          >Add Podcast
          </Button>

        </StyledCardActions>
        { selectedEpisode && (
          <>
            <Typography>
              {`Now Playing: ${selectedEpisode.title}`}
            </Typography>
            <Box mt={3} mb={3} ml={1.5}>
              <AudioPlayer src={selectedEpisode.audioUrl} autoplay />
            </Box>
          </>
        )}
        <Typography variant='h4'>Library</Typography>
        { results && results.map(podcast => {
          const listClickHandler = () => {
            setSelected(podcast)
          }

          const isSelected = selected ? selected.id === podcast.id : null

          return (
            <EpisodeCell key={podcast.id} onClick={listClickHandler} selected={isSelected} fullWidth>
              <ShowHeader>
                <Avatar small src={podcast.iconUrl} alt='avatar' />
                <Typography variant='subtitle1'>{podcast.title}</Typography>
              </ShowHeader>
            </EpisodeCell>
          )
        })}
      </StyledCard>

      <StyledCard style={{ height: '800px', overflowY: 'scroll' }}>
        { selected && (
          <div key={selected.version}>
            <ShowHeader>
              <Avatar src={selected.iconUrl} alt='avatar' />
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
        { selected && selected.episodes.map(episode => {
          const episodeClickHandler = () => {
            setSelectedEpisode(episode)
          }
          const onDrop = () => {
            if (!playlist) {
              dispatch(addPlaylist(episode.id, userDetails.id))
            }
          }

          const isSelected = selectedEpisode ? selectedEpisode.id === episode.id : null

          return (
            <DragDropContainer
              key={episode.id}
              targetKey='playlistDrop'
              onDrop={onDrop}
            >
              <EpisodeCell onClick={episodeClickHandler} selected={isSelected}>
                <Typography variant='h6'>
                  {episode.title}
                </Typography>
                <Typography>
                  {truncate(episode.description, 150)}
                </Typography>
              </EpisodeCell>
            </DragDropContainer>
          )
        })}
      </StyledCard>

      <StyledCard>
        <Typography variant='h4'>
          Playlist
        </Typography>
        <hr />
        {
          playlistSlots.map(slot => {
            let episode
            if (playlist) {
              const [first] = playlist.sequence
              if (first.position === slot) {
                ({ episode } = first)
              }
            }
            if (episode) {
              const episodeClickHandler = () => {
                setSelectedEpisode(episode)
              }
              const isSelected = selectedEpisode ? selectedEpisode.id === episode.id : null

              return (
                <EpisodeCell key={slot} onClick={episodeClickHandler} selected={isSelected}>
                  <Typography variant='h6'>
                    {episode.title}
                  </Typography>
                </EpisodeCell>
              )
            }

            return (
              <DropTarget
                key={slot}
                targetKey='playlistDrop'
                dropData={slot}
              >
                <PlaylistSlot>Add Episode</PlaylistSlot>
              </DropTarget>
            )
          })
        }
      </StyledCard>
    </Layout>
  )
}

