// Event Listener
document.getElementById('agregarProducto').addEventListener('submit', submitForm);

function submitForm(e){
    e.preventDefault();
    //Get value
    let id = getInput('inputId');
    let name = getInput('inputName');
    let desc = getInput('descripcion');
    let valor = getInput('valorUnitario');
    let estado = getInput('estado');
    
    //save to fb
    saveMessage(id, name, desc, valor, estado);
}

let messageRef = firebase.database().ref('messages')

//Funtion to get form values
function getInput(id){
    return document.getElementById(id).value;
}

//save to firebase
function saveMessage(id, name, desc, valor, estado){
    let newMR = messageRef.push();
    newMR.set({
        id: id,
        name: name,
        desc: desc,
        valor: valor,
        estado: estado
    });
}