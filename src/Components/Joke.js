import React from 'react'
import styled, { keyframes } from 'styled-components'

export default function Joke({ text, votes, upvote, downvote }) {
  const getColor = () => {
    if (votes >= 15) {
      return '#4CAF50'
    } else if (votes >= 12) {
      return '#8BC34A'
    } else if (votes >= 9) {
      return '#CDDC39'
    } else if (votes >= 6) {
      return '#FFEB3B'
    } else if (votes >= 3) {
      return '#FFC107'
    } else if (votes >= 0) {
      return '#FF9800'
    } else {
      return '#f44336'
    }
  }
  const getEmoji = () => {
    if (votes >= 15) {
      return 'em em-rolling_on_the_floor_laughing'
    } else if (votes >= 12) {
      return 'em em-laughing'
    } else if (votes >= 9) {
      return 'em em-smiley'
    } else if (votes >= 6) {
      return 'em em-slightly_smiling_face'
    } else if (votes >= 3) {
      return 'em em-neutral_face'
    } else if (votes >= 0) {
      return 'em em-confused'
    } else {
      return 'em em-angry'
    }
  }
  return (
    <JokeWrp votesColor={getColor()}>
      <div className='buttons'>
        <i className='fas fa-arrow-up' onClick={upvote}></i>
        <span>{votes}</span>
        <i className='fas fa-arrow-down' onClick={downvote}></i>
      </div>
      <div className='text'>{text}</div>
      <div className='emoji'>
        <i className={getEmoji()}></i>
      </div>
    </JokeWrp>
  )
}
const moveUp = keyframes`
  0%,
  50%,
  100% {
    transform: translateY(0);
  }
  25%,
  75% {
    transform: translateY(-3px);
  }
`
const moveDown = keyframes`
  0%,
  50%,
  100% {
    transform: translateY(0);
  }
  25%,
  75% {
    transform: translateY(3px);
  }
`
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  30% {
    transform: rotate(20deg);
  }
  60% {
    transform: rotate(0deg);
  }
  80% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(0deg);
  }
`
const JokeWrp = styled.div`
  display: flex;
  border-bottom: 2px solid #eee;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  padding: 1rem;
  .buttons {
    display: flex;
    margin-right: 1rem;
    align-items: center;
    justify-content: center;
    width: 15%;
    span {
      --length: 50px;
      width: var(--length);
      height: var(--length);
      line-height: var(--length);
      border-radius: 50%;
      text-align: center;
      font-size: 20px;
      font-weight: 300;
      border: 3px solid ${props => props.votesColor};
      box-shadow: 0 10px 38px rgba(0, 0, 0, 0.2), 0 10px 12px rgba(0, 0, 0, 0.1);
    }
    .fa-arrow-up,
    .fa-arrow-down {
      font-size: 1.5em;
      margin: 10px;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        animation-duration: 0.7s;
        animation-timing-function: ease-out;
      }
    }
    .fa-arrow-up:hover {
      animation-name: ${moveUp};
      color: green;
    }
    .fa-arrow-down:hover {
      animation-name: ${moveDown};
      color: red;
    }
  }
  .text {
    width: 75%;
    font-size: 1.2rem;
  }
  .emoji {
    font-size: 3rem;
    margin-left: auto;
    border-radius: 50%;
    box-shadow: 0 10px 38px rgba(0, 0, 0, 0.2), 0 10px 12px rgba(0, 0, 0, 0.1);
    &:hover {
      animation-name: ${spin};
      animation-duration: 0.7s;
      animation-timing-function: ease-in-out;
      animation-delay: 0s;
    }
  }
`
