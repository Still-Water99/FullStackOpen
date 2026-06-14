const Content =({parts}) => {
  return (<>
  {parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
  <h3>total of {parts.reduce((sum, part) => sum + part.exercises, 0)} exercises</h3>
</>
  )
}

const Course = ({ course }) => {
    return (
      <div>
        <h2>{course.name}</h2>
        <Content parts={course.parts} />
      </div>
    )
}

export default Course