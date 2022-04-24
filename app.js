const express = require("express");
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
//const port = 3000;
const json_reminders = fs.readFileSync("./reminders.json", 'utf-8'); //Toma el json con los recordatorios de la agenda
const reminders = JSON.parse(json_reminders);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/static' ));
app.use(express.json());


app.get("/recordatorios", (req, res) => {
    res.send(reminders);
});

app.post('/nuevo-recordatorio', (req, res) => {
    const {day, month, year, name, description} = req.body;
    let newReminder = {
        day,
        month,
        year,
        name,
        description
    }
    reminders.push(newReminder);
    
    let json_reminders = JSON.stringify(reminders);
    fs.writeFileSync("reminders.json", json_reminders, function (err) {
        if(err) {
            console.log(err);
            res.send({
                mensaje: "Ha ocurrido un error: " + err
            });
        }else{
            console.log("Archivo guardado");
            res.send({
                mensaje: "Tu recordatorio fue agregado con éxito"
            });
        }
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Escuchando solicitudes a http://localhost:3000");
});