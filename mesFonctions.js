
window.onload = function load(){
    document.getElementById("mesMessages").style.display = "none";
    document.getElementById("nouveauContact").style.display = "none";
    document.getElementById("composer").style.display = "none";
    var newMessage = document.getElementById("message");
    var carnetContact = [];


    function jsonCarnetContact(name){
        this.name = name;
    }

    function jsonMessage(newMessage){
        this.newMessage = newMessage;
    }
}

function verifierCaractere(){
    var regex = /^[a-zA-Z\éêëèïîôöûùÉçÇâàáa\n\s\,.]+$/i;
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        alert("Caractère invalide\nSeulement les lettres sont autorisées ");
        event.preventDefault();
        return false;
       
    }
}
function dec2hex (dec) {
    return dec.toString(16).padStart(2, "0");
  }
  
  // generateId :: Integer -> String
  function generateId (len) {
    var arr = new Uint8Array((len || 400) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join('');
  }
function genererCle(){
    document.getElementById("SecretKey").value = generateId();
}

function ajouterAuCarnet(){
    var CleId = document.getElementById("SecretKey");
    if(CleId.value != ''){
       /* var object = new jsonCarnetContact(CleId.value);
        carnetContact.push(object);
        localStorage["carnet"] = JSON.stringify(carnetContact);*/
        if(localStorage.getItem("carnet") === undefined){
            window.localStorage.setItem("carnet",JSON.stringify(CleId.value)); 
        }
        else{
            window.localStorage.setItem("carnet",old + ";" + CleId.value); 
        }
        afficherCarnet();
    }

}

function afficherCarnet(){
    /*var monCarnet = document.getElementById("mesContacts").value;
    if(localStorage["carnet"] === undefined){
        localStorage["carnet"] = '';
    }
    else{
        carnetContact = JSON.parse(localStorage["carnet"]);
        monCarnet.innerHTML = 'test';
        for(var n in carnetContact){
            var str = '<p>';
            str +=  carnetContact[n].CleId ;
            str += '</p>';
            monCarnet.innerHTML += str;
       }

    }*/
    var messagecarnet =  window.localStorage.getItem("carnet");
    document.getElementById("mesContacts").innerHTML = messagecarnet;

}
function envoyerMessage(){
    var newMessage = document.getElementById("message").value;
    var lastMessage = localStorage.getItem("datasMessage");
    if(lastMessage === null){
        localStorage.setItem("datasMessage", JSON.stringify(newMessage));
    }
    else{
        newMessage +=  (";" + lastMessage);
        localStorage.setItem("datasMessage", newMessage);
    }
}
function supprimerMessage(){

}

function afficherMessage(){
    var objectFromLS = JSON.parse(localStorage.getItem("datasMessage"));
    var output = "";
    var nombreMessage = 0;
    for(var n; n < objectFromLS.length; n++){
        if(objectFromLS[n] == ";"){
            nombreMessage ++;
            for(var f; f < n; f++){
                output += "<h4>Message #" + nombreMessage;
                output += "</h4>"
                output += objectFromLS[f];
            }
        }

    }
    document.getElementById("listedesMessages").innerHTML = output;
}

function boutonNouveau(){
    document.getElementById("mesMessages").style.display = "none";
    document.getElementById("nouveauContact").style.display = "none";
    document.getElementById("composer").style.display = "block";
    document.getElementById("principal").style.display = "none";
    document.getElementById("mesContacts").style.display = "none";
    document.getElementById("listedesMessages").style.display = "none";
}

function boutonBoite(){
    document.getElementById("mesMessages").style.display = "block";
    document.getElementById("nouveauContact").style.display = "none";
    document.getElementById("composer").style.display = "none";
    document.getElementById("principal").style.display = "none";
    document.getElementById("mesContacts").style.display = "none";
    document.getElementById("listedesMessages").style.display = "block";
    afficherMessage();
    //const message =  window.localStorage.getItem("datasMessage");
    //document.getElementById("listedesMessages").innerHTML = JSON.parse(message);
}
function boutonCarnet(){
    document.getElementById("mesMessages").style.display = "none";
    document.getElementById("nouveauContact").style.display = "block";
    document.getElementById("composer").style.display = "none";
    document.getElementById("principal").style.display = "none";
    document.getElementById("mesContacts").style.display = "block";
    document.getElementById("listedesMessages").style.display = "none";
    afficherCarnet();

}



/*
class AddressBook{
    constructor(){
        const initData = [
            {Name: 'Test', Key: SubtleCrypto.generateKey()},
        ];
        this.contactList = localStorage.contactList ? JSON.parse(localStorage.contactList) : initData;
        this.Enregistrer();
    }
    Enregistrer(){
        //Local storage
        localStorage.contactList = JSON.stringify(this.contactList);
    }
    Nouveau(name){
        //New contact
        key = SubtleCrypto.generateKey();
        const contact = { name,key };
        this.contactList.push(contact);
        this.Enregistrer();
    }
    Supprimer(index){
        //Delete contact
        this.contactList.splice(index,1);
        this.Enregistrer();
    }
    search(condition){
        //Search according to conditions, no matter whether you entered the name or phone number, you can match
        const reg = new RegExp(condition);
        return this.contactList.filter( item => reg.test(item.name) || reg.test(item.key));
    }
    getAllData(){
        //Return to all data
        document.write(this.contactList);
        return this.contactList;
    }
}*/