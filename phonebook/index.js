const express = require('express');
const morgan = require('morgan');

const app = express();

const generateId = () => {
    let maxId = Math.max(...persons.map(person => person.id))
    return maxId + 1;
}

app.use(express.json());

// Make express show static files from the build
app.use(express.static('build'));

// Using the morgan library to log tiny configurations
app.use(morgan('tiny'));

morgan.token('body',(req, res)=>{
    return req.body
});

app.use(morgan('body'));

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

app.get('/', (request, response) => {
    response.send('<h1>Yes, it works</h1>')
});


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
    response.send(output);
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

// Adding an entry the phone book
app.post('/api/persons/', (request, response) => {
    const body = request.body;
    // console.log(body)
    if(!body.name || !body.number){
        return response.status(400).json({
            error: `Either the name or the number is missing.`,
        });
    }else{

        const nam = persons.find(element => element.name === body.name);
        if(nam){
            return response.status(400).json({
                error: 'Name already exists',
            });
        }else{
            const person = {
                id: generateId(),
                name: body.name,
                number: body.number
            }
    
            persons.concat(person);
            response.json(person);
        }
    }
});

const PORT = 3001;

app.listen(PORT, ()=>{
    console.log(`Phonebook server working on server ${PORT}`);
});