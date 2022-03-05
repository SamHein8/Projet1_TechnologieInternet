
window.onload = function load(){
    document.getElementById("mesMessages").style.display = "none";
    document.getElementById("nouveauContact").style.display = "none";
    document.getElementById("composer").style.display = "none";

}


/*=====================================================================================================

Section pour la gestion des messages dans le tableau HTML ainsi que dans le localStorage


=====================================================================================================*/


//Classe pour les messages
class Message {
  constructor(contenu,author){
      this.contenu = contenu; //Message
      this.author = author; //Author
  }
}

//Classe pour la gestion de l'affichage des messages
class UI_Message {

  //Afficher les messages
  static displayMessages(){
      let messages = StoreMessage.getMessages();

      messages.forEach((message) => UI_Message.addMessageToList(message));

     
  }
  //Ajouter un message au tableau
  static addMessageToList(message){
      const list = document.querySelector('#message-list');

      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${message.contenu}</td>
          <td>${message.author}</td>
          <td><a href="#" class="btn-supprimer delete">X</a>    <a href="#" class="btn-modifier modifier">Modifier</a></td>
      `;

      list.appendChild(row);
  }

  //Effacer les champs de de création d'un message
  static clearFields(){
    const textareaMessage = document.getElementById("message");
    const textareaAuteur = document.getElementById("auteur");
    textareaAuteur.value = '';
    textareaMessage.value = '';
  }

  //Supprimer un message du tableau
  static deleteMessage(el){
    el.parentElement.parentElement.remove();
  }

  //Rechercher un message dans le tableau
  static rechercheMessage(recherche){
    let messages = StoreMessage.getMessages();
    const list = document.querySelector('#resultsMessage');
    var donne = "";
    messages.forEach(message => {
      if(message.author === recherche){
       donne = `
      <table class="table-custom">
      <tr>
      <th>Message</th> 
      <th>Auteur</th>
      </tr>
      <tr>
       <td>${message.contenu}</td>
       <td> ${message.author}</td>
       </tr>
      </table>
       `;
      }
    });
    if(donne != null){
      list.innerHTML = donne;
    }
    else{
      list.innerHTML = '';
      alert("Aucune correspondance");
    }
    document.querySelector("#searchMessage").value = '';
  }

}
//Classe pour gérer les messages dans le localStorage
class StoreMessage {
  //Trouver les messages dans le localStorage
  static getMessages() {
      let messages;
      if(localStorage.getItem('Listemessages') === null) {
        messages = [];
      } else {
        messages = JSON.parse(localStorage.getItem('Listemessages'));
      }
  
      return messages;
    }
//Enregistrer un message dans le localStorage
  static saveMessage(message){
      let messages;
      messages = StoreMessage.getMessages();
      messages.push(message);
      localStorage.setItem('Listemessages',JSON.stringify(messages));
  }
//Retirer un message dans le localStorage
  static removeMessage(isbn){
      const messages = StoreMessage.getMessages();

      messages.forEach((message, index) => {
        if(message.author === isbn) {
          messages.splice(index, 1);
        }
      });
  
      localStorage.setItem('Listemessages', JSON.stringify(messages));
  }
  //Modifier un message dans le localStorage 
  static modifierMessage(isbn){
    const messages = StoreMessage.getMessages();

    messages.forEach((message, index) => {
      if(message.author === isbn) {
        document.querySelector('#message').value = message.contenu;
        document.querySelector('#auteur').value = message.author;
        messages.splice(index, 1);
      }
    });

    localStorage.setItem('Listemessages', JSON.stringify(messages));
}
}

document.addEventListener('DOMContentLoaded',UI_Message.displayMessages);

//Vérification du bonton envoyer (Ajout d'un message)
document.querySelector('#envoie-message').addEventListener('submit',(e) => {
  

  e.preventDefault();

 
  const title = document.querySelector('#message').value;
  const author = document.querySelector('#auteur').value;

  if(title === '' || author === ''){

  } else {
      
      const newmessage = new Message(title,author);

    
      UI_Message.addMessageToList(newmessage);

     
      StoreMessage.saveMessage(newmessage);

      UI_Message.clearFields();
 
  }

});
      
//Vérification du bonton Supprimer et Modifier (Suppression ou modification d'un message)
document.querySelector('#message-list').addEventListener('click',(e) => {
  if(e.target.classList.contains('delete')){
    UI_Message.deleteMessage(e.target);
    StoreMessage.removeMessage(e.target.parentElement.previousElementSibling.textContent);
  }
  else{
    UI_Message.deleteMessage(e.target);
    StoreMessage.modifierMessage(e.target.parentElement.previousElementSibling.textContent);
    boutonNouveau();
  }
});

document.querySelector('#search-form_message').addEventListener('submit',(e) => {
  

  e.preventDefault();

  var message = document.querySelector('#searchMessage').value;


  UI_Message.rechercheMessage(message);
});


/*=====================================================================================================

Section pour la gestion des contacts dans la page HTML ainsi que dans le localStorage


=====================================================================================================*/



//Classe contenant un contact 
class Contact {
  constructor(title,author){
      this.title = title; //Cle
      this.author = author; // Nom
  }
}
//Gestion de l'interface pour la création de nouveaux contacts
class UI {

  //Afficher les contacts
  static displayContacts(){
      let contacts = Store.getContacts();

      contacts.forEach((contact) => UI.addContactToList(contact));

     
  }
  //Rechercher un contact
  static rechercheContact(recherche){
    let contacts = Store.getContacts();
    const list = document.querySelector('#results');
    var donne = "";
    contacts.forEach(contact => {
      if(contact.author === recherche || contact.title === recherche){
       donne = `
      <table class="table-custom">
      <tr>
      <th>Clé</th> 
      <th>Nom</th>
      </tr>
      <tr>
       <td>${contact.title}</td>
       <td> ${contact.author}</td>
       </tr>
      </table>
       `;
      }
    });
    if(donne != null){
      list.innerHTML = donne;
    }
    else{
      list.innerHTML = '';
    }
    document.querySelector("#search").value = '';
  }
   //Ajouter un contact au carnet
  static addContactToList(contact){
      const list = document.querySelector('#book-list');

      const row = document.createElement('tr');

      row.innerHTML = `
          <td>${contact.title}</td>
          <td>${contact.author}</td>
          <td><a href="#" class="btn-supprimer delete">X</a>    <a href="#" class="btn-modifier modifier">Modifier</a></td>
      `;

      list.appendChild(row);
  }

   //Vide les entrées pour la création  d'un contact
  static clearFields(){
    document.querySelector("#title").value = " ";
    document.querySelector("#author").value = " ";
  }

  //Supprimer un contact au carnet
  static deleteContact(el){
    el.parentElement.parentElement.remove();
  }

   //Gestion des alertes
  static showAlerts(message,className){
    if(message == "Please fill in all details..."){
    alert("Veuillez remplir tous les paramètres...");
    }
    else if(message == "Contact Added"){
     // alert("Ajoutez au carnet" + "\n"  +message);
    }
    else if(message == "Contact deleted"){
     // alert("Retirez du carnet" + "\n"  +message);
    }


  }
}

//Gestion des contacts dans le localStorage
class Store {
  static getContacts() {
      let contacts;
      if(localStorage.getItem('contacts') === null) {
        contacts = [];
      } else {
        contacts = JSON.parse(localStorage.getItem('contacts'));
      }
  
      return contacts;
    }
//Enregistrer un contact dans le localStorage
  static saveContact(contact){
      let contacts;
      contacts = Store.getContacts();
      contacts.push(contact);
      localStorage.setItem('contacts',JSON.stringify(contacts));
  }
//Retirer un contact dans le localStorage
  static removeContact(isbn){
      const contacts = Store.getContacts();

      contacts.forEach((contact, index) => {
        if(contact.author === isbn) {
          contacts.splice(index, 1);
        }
      });
  
      localStorage.setItem('contacts', JSON.stringify(contacts));
  }
  //Modifier un contact dans le localStorage
  static ModifierContact(isbn){
    const contacts = Store.getContacts();

    contacts.forEach((contact, index) => {
      if(contact.author === isbn) {
        document.querySelector('#author').value = contact.author;
        document.querySelector('#title').value = contact.title;
        contacts.splice(index, 1);
      }
    });

    localStorage.setItem('contacts', JSON.stringify(contacts));
}
}


document.addEventListener('DOMContentLoaded',UI.displayContacts);



//Vérification du bonton Ajouter (Ajout d'un contact dans le tableau et localStorage)
document.querySelector('#book-form').addEventListener('submit',(e) => {
  

  e.preventDefault();

 
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  if(title === '' || author === ''){
      UI.showAlerts('Please fill in all details...','danger');
  } else {
      
      const contact = new Contact(title,author);

    
      UI.addContactToList(contact);

     
      Store.saveContact(contact);
 
      UI.clearFields();
  }

});
//Vérification du bonton rechercher (Recherche d'un contact)
document.querySelector('#search-form').addEventListener('submit',(e) => {
  

  e.preventDefault();

  var contact = document.querySelector('#search').value;

  UI.rechercheContact(contact);
});

//Vérification du bonton Supprimer et Modifier (Suppression ou modification d'un contact)
document.querySelector('#book-list').addEventListener('click',(e) => {
  if(e.target.classList.contains('delete')){
    UI.deleteContact(e.target);

    Store.removeContact(e.target.parentElement.previousElementSibling.textContent);
  }
  else{
    UI.deleteContact(e.target);
    Store.ModifierContact(e.target.parentElement.previousElementSibling.textContent);
  }
});

//Vérification des caractère entrés par l'utilisateur

function verifierCaractere(){
    var regex = /^[a-zA-Z\éêëèïîôöûùÉçÇâàáa\n\s\,.]+$/i;
    var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
    if (!regex.test(key)) {
        alert("Caractère invalide\nSeulement les lettres sont autorisées ");
        event.preventDefault();
        return false;
       
    }
}

//Function pour générer la clé public
function dec2hex (dec) {
    return dec.toString(16).padStart(2, "0");
  }
  
  function generateId (len) {
    var arr = new Uint8Array((len || 175) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join('');
  }
function genererCle(){
    document.getElementById("title").value = generateId();
}

//Fonction pour envoyer un message (Actuellement envoie le message dans le localStorage)
function envoyerMessage(){

  const message = document.getElementById("message").value;
  const author = document.getElementById("message").value;


  const messages = new Message(message,author);

    
  UI_Message.addMessageToList(messages);
 
  StoreMessage.saveMessage(messages);
}


//Fonction pour la gestion de l'interface de la page Web
function boutonNouveau(){
    document.getElementById("mesMessages").style.display = "none";
    document.getElementById("nouveauContact").style.display = "none";
    document.getElementById("composer").style.display = "block";
    document.getElementById("principal").style.display = "none";
    document.getElementById("mesContacts").style.display = "none";
}

function boutonBoite(){
    document.getElementById("mesMessages").style.display = "block";
    document.getElementById("nouveauContact").style.display = "none";
    document.getElementById("composer").style.display = "none";
    document.getElementById("principal").style.display = "none";
    document.getElementById("mesContacts").style.display = "none";
}
function boutonCarnet(){
    document.getElementById("mesMessages").style.display = "none";
    document.getElementById("nouveauContact").style.display = "block";
    document.getElementById("composer").style.display = "none";
    document.getElementById("principal").style.display = "none";
    document.getElementById("mesContacts").style.display = "block";

}
function boutonAbout(){
  document.getElementById("mesMessages").style.display = "none";
  document.getElementById("nouveauContact").style.display = "none";
  document.getElementById("composer").style.display = "none";
  document.getElementById("principal").style.display = "block";
  document.getElementById("mesContacts").style.display = "none";
  document.getElementById("btnAbout").style.backgroundColor = "#04AA6D";
}
