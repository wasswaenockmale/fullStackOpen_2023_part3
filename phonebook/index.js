const { response } = require('express');
const express = require('express');

const app = express();

app.use(express.json());

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons',(request, response) =>{
    response.send(persons);
});

// The page has to show the time that the request was received and how many
// entries are in the phonebook at the time of processing the request.
app.get('/info', (request, response) => {
    let output = `<div>
        <p>Phonebook has info for ${persons.length} people</p> 
        <p>${new Date().toUTCString()}</p>
        </div>`;
    response.send(output)
});

// Get information for a particular person
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);

    const person = persons.find(per => per.id === id);

    // Check whether the person is not undefined
    if(person){
        response.send(person);
    }else{
        console.log(person);
        response.status(400).end();
    }
});

// Now, this functionality will delete a single instance of the person from the server
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    
    persons = persons.filter(elem => elem.id !== id);
    response.json(persons);
    
});

const PORT = 3001;

app.listen(PORT, ()=>{
    console.log(`Phonebook server working on server ${PORT}`);
});