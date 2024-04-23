function PersonDetails({person}) {
    const {name, number} = person
    return (
        <p >{name} {number}</p>
    )
}
export default PersonDetails