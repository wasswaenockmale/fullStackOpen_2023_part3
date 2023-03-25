// If the length of is greater than 4
// if only the password is shown, fetch things from the db 
const mongoose = require('mongoose');
const len = process.argv.length;
if(len < 3){
    console.log("Include the password argument");
    process.exit(1);
}

if(len > 5){
    console.log("Check if your name has a white space");
    process.exit(1);
}else{
    const pass = process.argv[2]; // This picks the password from the terminal
    const name = process.argv[3];
    const number = process.argv[4];
    const url = `mongodb+srv://wasswaenock:${pass}@cluster1.xgrccj2.mongodb.net/phonebook?retryWrites=true&w=majority`;

    mongoose.set('strictQuery',false);
    mongoose.connect(url,).then(()=>console.log('...Connected...')).catch(e=>console.log(e));

    // Now create a schema
    const phoneSchema = new mongoose.Schema({
        name: String,
        number:Number,
    });

    const PhoneBook = mongoose.model('PhoneBook', phoneSchema);
    if(len < 4){
        PhoneBook.find({}).then(res => {
            console.log("phonebook:");
            res.forEach(r => {
                console.log(`${r.name} ${r.number}`);
            })

            mongoose.connection.close();
        });
    }else{
        const phone = new PhoneBook({
            name: name,
            number: number,
        });

        phone.save().then(res => {
            console.log(`added ${res.name} number ${res.number} to phonebook`);
            mongoose.connection.close();
        })
    }
}

