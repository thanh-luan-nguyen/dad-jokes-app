import styled from 'styled-components'
import JokeList from './Components/JokeList'

export default function App() {
  return (
    <AppWrp>
      <JokeList />
    </AppWrp>
  )
}

const AppWrp = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: 'Rubik', sans-serif;
  color: #78909c;
  background: linear-gradient(
    135deg,
    rgba(179, 229, 252) 0%,
    rgba(179, 229, 252) 50%,
    rgba(240, 98, 146) 50%,
    rgba(240, 98, 146) 100%
  );
`
