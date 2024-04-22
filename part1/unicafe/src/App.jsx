import { useState } from 'react'

function StatisticLine({ text, value }) {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </>
  )
}
function Statistics({ good, neutral, bad }) {
  if (good + neutral + bad) {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={good + neutral + bad} />
            <StatisticLine text="average" value={(good - bad) / (good + neutral + bad)} />
            <StatisticLine text="positive" value={((good) / (good + neutral + bad) * 100) + ' %'} />
          </tbody>
        </table>
      </div>
    )
  }
  return (
    <>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </>
  )
}
function Button({ text, handleClick }) {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}
function App() {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const rateGood = () => {
    setGood(good + 1)
  }
  const rateNeutral = () => {
    setNeutral(neutral + 1)
  }
  const rateBad = () => {
    setBad(bad + 1)

  }

  return (
    <>
      <h1>give feedback</h1>
      <Button text="good" handleClick={rateGood} />
      <Button text="neutral" handleClick={rateNeutral} />
      <Button text="bad" handleClick={rateBad} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
