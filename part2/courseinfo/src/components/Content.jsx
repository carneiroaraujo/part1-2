import Part from './Part'
function Content({parts}) {
    return (
        <>
        {parts.map(part=>
            <Part part={part} key={part.id}/>
        )}
        <p><strong>total of {parts.reduce((prev, curr)=>prev+curr.exercises, 0)} exercises</strong></p>
        </>
    )
}
export default Content