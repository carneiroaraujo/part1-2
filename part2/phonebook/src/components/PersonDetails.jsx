function PersonDetails({ person, remove }) {
    const { name, number } = person
    return (


        <p >{name} {number} <button onClick={() => { remove(person.id) }}>delete</button></p>

    )
}
export default PersonDetails