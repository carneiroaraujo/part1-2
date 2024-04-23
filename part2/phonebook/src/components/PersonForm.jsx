function PersonForm({onNameChange, onNumberChange, newNameValue, newNumberValue, onSubmit}) {
    return (
        <form onSubmit={onSubmit}>
            <div>
                name: <input onChange={onNameChange} value={newNameValue} type="text" />
            </div>
            <div>
                number: <input onChange={onNumberChange} value={newNumberValue} type="text" />
            </div>
            <div>
                <button type='submit'>add</button>
            </div>
        </form>
    )
}
export default PersonForm