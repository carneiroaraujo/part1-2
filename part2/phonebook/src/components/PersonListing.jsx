import PersonDetails from './PersonDetails'

function PersonListing({persons, filter}) {
    return (
        <>{ persons.filter(person => person.name.toLowerCase().includes(filter)).map(person => <PersonDetails  key={person.id} person={person}/>) }</>
    )
}
export default PersonListing