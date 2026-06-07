import { useState } from 'react'

const StatisticLine =({text,value,end})=>{
  return (<>{text} {value} {end}<br /></>)
}

const Statistics = ({good,neutral,bad,total}) => {
  if(total !==0){
    return (<div>
      <h1>Statistics</h1>
      <p>
        <StatisticLine text="good" value={good} end="" />
        <StatisticLine text="neutral" value={neutral} end="" />
        <StatisticLine text="bad" value={bad} end="" />
        <StatisticLine text="all" value={total} end="" />
        <StatisticLine text="average" value={(good-bad)/total} end="" />
        <StatisticLine text="positive" value={good/total*100} end="%" />
      </p>
    </div>)
  }
  return (<div>
    <h1>Statistics</h1>
    <p> No feedback given</p>
  </div>)
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total,setTotal] =useState(0)

  const changeGood = () => {
    let newGood=good+1
    setGood(newGood)
    setTotal(newGood+neutral+bad)
  }
  const changeNeutral = () => {
    let newNeutral=neutral+1
    setNeutral(newNeutral)
    setTotal(good+newNeutral+bad)
  }
  const changeBad = () => {
    let newBad=bad+1
    setBad(newBad)
    setTotal(good+neutral+newBad)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={()=>changeGood(good+1)}>good</button>
      <button onClick={()=>changeNeutral(neutral+1)}>neutral</button>
      <button onClick={()=>changeBad(bad+1)}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} total={total}></Statistics>
    </div>
  )
}

export default App