import PersonDetails from './PersonDetails'



function PersonListing({ persons, filter, remove }) {
    return (
        <>{persons.filter(person => person.name.toLowerCase().includes(filter)).map(person => <PersonDetails key={person.id} person={person} remove={remove}/>)}</>
    )
}
export default PersonListing