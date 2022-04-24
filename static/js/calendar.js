
var remindersArray = [];
var search = undefined;

//Función del buscador
function showRemindersList(array) {

    let content = "";
    for (let i = 0; i < array.length; i++) {
        let reminder = array[i];
        let lookingFor = reminder.name + reminder.description;

        if (lookingFor.toLowerCase().indexOf(search) != -1) {
            
            content += `
                <div class="col-md-6 col-lg-4">
                    
                    <ul class="list-group">
                        <li class="list-group-item list-group-item-success text-center">`+ reminder.name +`</li>
                        <li class="list-group-item">Fecha: `+ reminder.day+`/`+reminder.month+`/`+reminder.year+`</li>
                        <li class="list-group-item">Descripción: `+ reminder.description+`</li>
                    </ul>
                    
                </div>
            `;//Agregar <a href=""></a> a li de nreminder name
        }

        document.getElementById("list").innerHTML = content;
    }
}

//Función para mostrar 
function showReminders(array) {

    let content = "";

    for (let i = 0; i < array.length; i++) {
        
        let reminder = array[i];

        content +=`
                
            <div class="col-md-6 col-lg-4">
                <ul class="list-group">
                    <li class="list-group-item list-group-item-success text-center">${reminder.name}</li>
                    <li class="list-group-item">Fecha: ${reminder.day}/${reminder.month}/${reminder.year}</li>
                    <li class="list-group-item">Descripción: ${reminder.description}</li>
                </ul>
                <br>   
            </div> 
        `;
    }
    
    document.getElementById("list").innerHTML = content;
    
    // <button class= "close" onclick="eliminar(${i})"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-trash" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    //                     <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    //                     <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
    //                     </svg></button> . A la derecha de reminder.name
}

//Función eliminar (funciona sólo en el momento, los cambios no serán guardados en el almacenamiento (archivo json) )
// function eliminar(i) {
// 	if (remindersArray.length > 1) {
// 		remindersArray.splice(i, 1); //el segundo parámetro es la cantidad de objetos que queremos borrar
//         showReminders(remindersArray);      
// 	}
// }

//Cuando carga la página
document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("principal").innerHTML = `
        <div class="row">
                <div class="mx-auto">
                    <img class="img-fluid images" src="./img/agenda.png" alt="">
                </div>
        </div> 
        <br>
        <div class="row">
            <div class="col-auto align-items-center mx-auto">

                <div id="buttons" class="btn-group btn-group-lg d-none" role="group" aria-label="Basic example">
                    <button type="button" id="option1" class="btn btn-light">Crear</button>
                    <button type="button" id="option2" class="btn btn-light">Buscar</button>
                    <button type="button" id="option3" class="btn btn-light">Mostrar todos</button>
                </div>

            </div>
        </div>
    `;
    
    setTimeout(() => {
        document.getElementById("buttons").classList.remove("d-none");
    }, 1000);

    getJSONData(REMINDERS).then(function (resultObj) { //Obtener Array de Objetos con los recordatorios
        if (resultObj.status === "ok") {
            remindersArray = resultObj.data;
        }
    });

    document.getElementById("option1").addEventListener("click", function () { //Botón Crear//////////////////////////////////////////////////////

        document.getElementById("buttons").classList.add("d-none");

        document.getElementById("principal").innerHTML = `
            <div class="row">
                <div id="calendar" class="col-auto align-items-center mx-auto">
                    <form id="create" class="needs-validation" action="" novalidate>
                        <h3 style="color: aliceblue;">Agregar nuevo recordatorio</h3>
                        <br>
                        <p style="width: 30rem; display: inline-flex;">
                            <label for="date"></label>
                            <input id="day" class="form-control" type="number" name="day" placeholder="día" min="1" max="31"
                                required />
                            <select id="month" class="form-control" required>
                                <option value="1">Enero</option>
                                <option value="2">Febrero</option>
                                <option value="3">Marzo</option>
                                <option value="4">Abril</option>
                                <option value="5">Mayo</option>
                                <option value="6">Junio</option>
                                <option value="7">Julio</option>
                                <option value="8">Agosto</option>
                                <option value="9">Setiembre</option>
                                <option value="10">Octubre</option>
                                <option value="11">Noviembre</option>
                                <option value="12">Diciembre</option>
                            </select>
                            <input id="year" class="form-control" type="number" name="year" placeholder="año" min="2022"
                                required />
                        </p>
                        <p>
                            <label for="name"></label>
                            <input id="name" class="form-control" type="text" name="name"
                                placeholder="Nombre del recordatorio" required />
                        </p>
                        <p>
                            <label for="description"></label>
                            <textarea id="description" class="form-control" name="description"
                                placeholder="Descripción del recordatorio" required></textarea>
                        </p>

                        <br>
                        <button type="button" class="btn btn-secondary" onclick="window.location.reload()">Cancelar</button>
                        <button id="confirmBtn" type="submit" class="btn btn-primary">Guardar</button>
                        <br><br>
                    </form>

                    
                </div>
            </div>    
        `;

        var form = document.getElementById('create');
        var dayValue;
        var monthValue;
        var yearValue;
        var descriptionValue;

        form.addEventListener('submit', function (e) {
            if (form.checkValidity() === false) {
                e.preventDefault();
                e.stopPropagation();
            }

            form.classList.add('was-validated');

            //----------------------------------------Para el backend
            if (form.checkValidity() === true) {
                e.preventDefault();
                e.stopPropagation();

                dayValue = document.getElementById("day").value;
                monthValue = document.getElementById("month").value;
                yearValue = document.getElementById("year").value;
                nameValue = document.getElementById("name").value;
                descriptionValue = document.getElementById("description").value;

                reminderObject = {
                    day: dayValue,
                    month: monthValue,
                    year: yearValue,
                    name: nameValue,
                    description: descriptionValue
                }
                console.log(reminderObject);

                postJSONData(ADD_REMINDER, reminderObject).then(function (resultObj) { //Envía al backend el objeto reminderObject
                    if (resultObj.status === "ok") {
                        alert(resultObj.data.mensaje);
                    }
                });

                setTimeout(() => {
                    //Muestra como quedó el recordatorio:
                    document.getElementById("principal").innerHTML = `
                        <div class="col-auto align-items-center mx-auto">
                        <br><br>
                            <h2 class="text-center text-success">¡Guardado!</h2>
                            <div class="alert alert-success" role="alert">
                                <h3 class="text-center">${nameValue}</h3>
                                <p>Día: ${dayValue}</p>
                                <p>Mes: ${monthValue}</p>
                                <p>Año: ${yearValue}</p>
                                <p>Descripción: ${descriptionValue}</p>
                            </div>
                        </div>    
                    `

                }, 2000);

                setTimeout(() => {
                    window.location.reload();
                }, 6000);      
            }
        });

    });



    document.getElementById("option2").addEventListener("click", function () { //Botón Buscar//////////////////////////////////////////////////////

        document.getElementById("buttons").classList.add("d-none");
        
        document.getElementById("principal").innerHTML = `
            <div class="row">
                <div id="seeker" class="col-auto align-items-center mx-auto">
                    <div class="row">
                        <div class="input-group" style="width: 24rem;" ;>
                            <div class="input-group-prepend">
                                <div class="input-group-text" id="btnGroupAddon">Buscar: </div>
                            </div>
                            <input id="buscador" type="text" class="form-control" placeholder="Nombre o descripción del recordatorio"
                                aria-label="Input group example" aria-describedby="btnGroupAddon" ;>
                            <div class="input-group-prepend">
                                <button type="button" class="input-group-text" id="btnGroupAddon" onclick="window.location.reload()">Cancelar</button>
                            </div>    
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.getElementById("buscador").addEventListener("input", function () {

            search = document.getElementById("buscador").value.toLowerCase();
        
            showRemindersList(remindersArray);

            if(document.getElementById("buscador").value == ""){
                
                document.getElementById("list").innerHTML =``;
            }
        
        });
    });

    document.getElementById("option3").addEventListener("click", function () { //Botón Mostrar//////////////////////////////////////////////////////
        
        console.log(remindersArray);
        document.getElementById("buttons").classList.add("d-none");
        document.getElementById("principal").classList.add("d-none");  
        showReminders(remindersArray);

        document.getElementById("listBtn").innerHTML = `
            <div class="row">
                <div class="mx-auto">
                    <button type="button" class="input-group-text" id="btnGroupAddon" onclick="window.location.reload()">Volver</button>n>
                </div>
            </div> 
            <br>
        `;
    });

});