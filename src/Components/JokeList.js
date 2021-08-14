import { useEffect, useState, useRef } from 'react'
import Joke from './Joke'
import axios from 'axios'
import { v4 as uuid } from 'uuid'
import styled, { css, keyframes } from 'styled-components'

export default function JokeList({ numJokes = 5 }) {
  const [jokes, setJokes] = useState(
    JSON.parse(window.localStorage.getItem('jokes')) || []
  )
  const [loading, setLoading] = useState(true)
  const seenJokes = useRef(new Set(jokes.map(joke => joke.text)))
  useEffect(() => {
    if (jokes.length === 0) {
      getJokes()
    } else setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const getJokes = async () => {
    try {
      let newJokes = []
      while (newJokes.length < numJokes) {
        let res = await axios.get('https://icanhazdadjoke.com/', {
          headers: { Accept: 'application/json' },
        })
        const newJoke = res.data.joke
        if (!seenJokes.current.has(newJoke))
          newJokes.push({ text: newJoke, votes: 0, id: uuid() })
      }
      setJokes([...jokes, ...newJokes])
      setLoading(false)
      window.localStorage.setItem(
        'jokes',
        JSON.stringify([...jokes, ...newJokes])
      )
    } catch (e) {
      alert(e)
      setLoading(false)
    }
  }
  const handleVote = (id, delta) => {
    const modifiedJokes = jokes.map(joke =>
      joke.id === id ? { ...joke, votes: joke.votes + delta } : joke
    )
    setJokes(modifiedJokes)
    window.localStorage.setItem('jokes', JSON.stringify(modifiedJokes))
  }
  const getNewJokes = () => {
    setLoading(true)
    getJokes()
  }
  const sortedJokes = jokes.sort((a, b) => b.votes - a.votes)
  return loading ? (
    <Spinner>
      <i className='far fa-8x fa-laugh fa-spin'></i>
      <h1>Loading...</h1>
    </Spinner>
  ) : (
    <JokeListWrp>
      <aside>
        <h1>
          <span>Dad</span> Jokes
        </h1>
        <img
          src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg'
          alt='laughing-emoji-icon'
        />
        <button onClick={getNewJokes}>Fetch Jokes</button>
      </aside>
      <section>
        {sortedJokes.map(joke => (
          <Joke
            key={joke.id}
            text={joke.text}
            votes={joke.votes}
            upvote={() => handleVote(joke.id, 1)}
            downvote={() => handleVote(joke.id, -1)}
          />
        ))}
      </section>
    </JokeListWrp>
  )
}

const H1 = css`
  font-size: 4rem;
  margin: 2rem;
  color: white;
  font-weight: 300;
  letter-spacing: 0.6rem;
`
const slowShake = keyframes`
0% {
    transform: translate(0px, 0px) rotate(0deg);
  }
  2% {
    transform: translate(5px, -6px) rotate(3.5deg);
  }
  4% {
    transform: translate(1px, -4px) rotate(2.5deg);
  }
  6% {
    transform: translate(-4px, -6px) rotate(0.5deg);
  }
  8% {
    transform: translate(2px, -9px) rotate(-0.5deg);
  }
  10% {
    transform: translate(5px, -5px) rotate(0.5deg);
  }
  12% {
    transform: translate(6px, 1px) rotate(0.5deg);
  }
  14% {
    transform: translate(5px, 2px) rotate(-1.5deg);
  }
  16% {
    transform: translate(8px, -6px) rotate(-0.5deg);
  }
  18% {
    transform: translate(-6px, -6px) rotate(3.5deg);
  }
  20% {
    transform: translate(-8px, 7px) rotate(-1.5deg);
  }
  22% {
    transform: translate(3px, 9px) rotate(1.5deg);
  }
  24% {
    transform: translate(-7px, 6px) rotate(3.5deg);
  }
  26% {
    transform: translate(9px, -5px) rotate(1.5deg);
  }
  28% {
    transform: translate(10px, 1px) rotate(-1.5deg);
  }
  30% {
    transform: translate(-8px, 5px) rotate(3.5deg);
  }
  32% {
    transform: translate(-9px, 5px) rotate(-1.5deg);
  }
  34% {
    transform: translate(-6px, 8px) rotate(0.5deg);
  }
  36% {
    transform: translate(6px, -2px) rotate(0.5deg);
  }
  38% {
    transform: translate(3px, 3px) rotate(3.5deg);
  }
  40% {
    transform: translate(6px, 10px) rotate(-1.5deg);
  }
  42% {
    transform: translate(2px, -2px) rotate(1.5deg);
  }
  44% {
    transform: translate(-6px, 8px) rotate(-0.5deg);
  }
  46% {
    transform: translate(-5px, 9px) rotate(-2.5deg);
  }
  48% {
    transform: translate(-4px, 2px) rotate(3.5deg);
  }
  50% {
    transform: translate(-9px, -3px) rotate(-1.5deg);
  }
  52% {
    transform: translate(3px, -2px) rotate(1.5deg);
  }
  54% {
    transform: translate(10px, 8px) rotate(3.5deg);
  }
  56% {
    transform: translate(7px, 8px) rotate(0.5deg);
  }
  58% {
    transform: translate(-4px, -3px) rotate(-0.5deg);
  }
  60% {
    transform: translate(9px, -4px) rotate(-1.5deg);
  }
  62% {
    transform: translate(-8px, -6px) rotate(1.5deg);
  }
  64% {
    transform: translate(-1px, -2px) rotate(3.5deg);
  }
  66% {
    transform: translate(0px, -8px) rotate(0.5deg);
  }
  68% {
    transform: translate(8px, -7px) rotate(0.5deg);
  }
  70% {
    transform: translate(3px, 4px) rotate(1.5deg);
  }
  72% {
    transform: translate(3px, 2px) rotate(1.5deg);
  }
  74% {
    transform: translate(-5px, -9px) rotate(0.5deg);
  }
  76% {
    transform: translate(1px, -8px) rotate(2.5deg);
  }
  78% {
    transform: translate(3px, 7px) rotate(-1.5deg);
  }
  80% {
    transform: translate(-9px, -4px) rotate(0.5deg);
  }
  82% {
    transform: translate(0px, -4px) rotate(-2.5deg);
  }
  84% {
    transform: translate(-7px, -3px) rotate(0.5deg);
  }
  86% {
    transform: translate(-8px, 6px) rotate(-1.5deg);
  }
  88% {
    transform: translate(3px, 4px) rotate(2.5deg);
  }
  90% {
    transform: translate(5px, 7px) rotate(2.5deg);
  }
  92% {
    transform: translate(2px, -8px) rotate(-2.5deg);
  }
  94% {
    transform: translate(-1px, -2px) rotate(-1.5deg);
  }
  96% {
    transform: translate(-4px, 10px) rotate(-1.5deg);
  }
  98% {
    transform: translate(10px, -9px) rotate(2.5deg);
  }
`
const JokeListWrp = styled.div`
  display: flex;
  width: 80%;
  height: 80%;
  aside {
    background: #9575cd;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 30%;
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.1),
      inset 0 0 25px #7e57c2;
    z-index: 1;
    h1 {
      ${H1}
      span {
        font-weight: 700;
        letter-spacing: 0;
      }
    }
    img {
      width: 50%;
      box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      &:hover {
        animation-name: ${slowShake};
        animation-duration: 5s;
        animation-timing-function: ease-in-out;
        animation-delay: 0s;
      }
    }
    button {
      font-size: 1.05rem;
      width: 50%;
      border-radius: 2rem;
      padding: 1rem 2rem;
      color: white;
      font-weight: 700;
      margin: 2rem;
      border: none;
      outline: none;
      cursor: pointer;
      transition: 0.8s cubic-bezier(0.2, 1, 0.2, 1);
      word-spacing: 1rem;
      background: linear-gradient(
        135deg,
        rgba(179, 229, 252) 0%,
        rgba(179, 229, 252) 50%,
        rgba(240, 98, 146) 50%,
        rgba(240, 98, 146) 100%
      );
      box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.1);
      &:hover {
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25);
        transform: translateY(-2px);
      }
    }
  }
  section {
    height: 90%;
    background: white;
    align-self: center;
    width: 70%;
    overflow: auto;
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.1);
  }
`
const Spinner = styled.div`
  color: white;
  text-align: center;
  h1 {
    ${H1}
  }
`
