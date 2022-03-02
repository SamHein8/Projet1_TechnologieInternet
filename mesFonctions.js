
window.onload = function load(){
    document.getElementById("mesMessages").style.display = "none";
    document.getElementById("nouveauContact").style.display = "none";
    document.getElementById("composer").style.display = "none";

}
class Message {
  constructor(contenu,author){
      this.contenu = contenu; //Message
      this.author = author; //Author
  }
}
class UI_Message {


  static displayMessages(){
      let messages = StoreMessage.getMessages();

      messages.forEach((message) => UI_Message.addMessageToList(message));

     
  }

  static addMessageToList(message){
      const list = document.querySelector('#message-list');

      const row = document.createElement('tr');
      if(message.contenu.length <= 100){
      row.innerHTML = `
          <td>${message.contenu}</td>
          <td>${message.author}</td>
          <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
       }
       else if(message.contenu.length <= 500) {
        row.innerHTML = `
        <td rowspan="3">${message.contenu}</td>
        <td>${message.author}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
       }
       else{
        row.innerHTML = `
        <td rowspan="15">${message.contenu}</td>
        <td>${message.author}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `; 
       }
      list.appendChild(row);
  }


  /*static clearFields(){
    document.querySelector("#title").value = " ";
    document.querySelector("#author").value = " ";
  }*/

 
  static deleteMessage(el){
      if(el.classList.contains('delete')){
          el.parentElement.parentElement.remove();
      }
  }

}
class StoreMessage {
  static getMessages() {
      let messages;
      if(localStorage.getItem('Listemessages') === null) {
        messages = [];
      } else {
        messages = JSON.parse(localStorage.getItem('Listemessages'));
      }
  
      return messages;
    }

  static saveMessage(message){
      let messages;
      messages = StoreMessage.getMessages();
      messages.push(message);
      localStorage.setItem('Listemessages',JSON.stringify(messages));
  }

  static removeMessage(isbn){
      const messages = StoreMessage.getMessages();

      messages.forEach((message, index) => {
        if(message.author === isbn) {
          messages.splice(index, 1);
        }
      });
  
      localStorage.setItem('Listemessages', JSON.stringify(messages));
  }
}

document.addEventListener('DOMContentLoaded',UI_Message.displayMessages);

document.querySelector('#envoie-message').addEventListener('submit',(e) => {
  

  e.preventDefault();

 
  const title = document.querySelector('#message').value;
  const author = "1";

  if(title === '' || author === ''){
      //UI.showAlerts('Please fill in all details...','danger');
  } else {
      
      const newmessage = new Message(title,author);

    
      UI_Message.addMessageToList(newmessage);

     
      StoreMessage.saveMessage(newmessage);
 
  }

});
      

document.querySelector('#message-list').addEventListener('click',(e) => {
  UI_Message.deleteMessage(e.target);

  StoreMessage.removeMessage(e.target.parentElement.previousElementSibling.textContent);
});



class Contact {
  constructor(title,author){
      this.title = title; //Cle
      this.author = author; // Nom
  }
}

class UI {


  static displayBooks(){
      let contacts = Store.getBooks();

      contacts.forEach((contact) => UI.addBookToList(contact));

     
  }

  static rechercheContact(recherche){
    let contacts = Store.getBooks();
    const list = document.querySelector('#results');
    var donne = "";
    contacts.forEach(contact => {
      if(contact.author === recherche || contact.title === recherche){
       donne = `
      <table class="table table-striped mt-5">
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
  }

  static addBookToList(contact){
      const list = document.querySelector('#book-list');

      const row = document.createElement('tr');

      row.innerHTML = `
          <td>${contact.title}</td>
          <td>${contact.author}</td>
          <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;

      list.appendChild(row);
  }


  static clearFields(){
    document.querySelector("#title").value = " ";
    document.querySelector("#author").value = " ";
  }

 
  static deleteBook(el){
      if(el.classList.contains('delete')){
          el.parentElement.parentElement.remove();
      }
  }

  
  static showAlerts(message,className){
    if(message == "Please fill in all details..."){
    alert("Veuillez remplir tous les paramètres..." + "\n"  +message);
    }
    else if(message == "Book Added"){
     // alert("Ajoutez au carnet" + "\n"  +message);
    }
    else if(message == "Book deleted"){
     // alert("Retirez du carnet" + "\n"  +message);
    }


  }
}

class Store {
  static getBooks() {
      let contacts;
      if(localStorage.getItem('contacts') === null) {
        contacts = [];
      } else {
        contacts = JSON.parse(localStorage.getItem('contacts'));
      }
  
      return contacts;
    }

  static saveBook(contact){
      let contacts;
      contacts = Store.getBooks();
      contacts.push(contact);
      localStorage.setItem('contacts',JSON.stringify(contacts));
  }

  static removeBook(isbn){
      const contacts = Store.getBooks();

      contacts.forEach((contact, index) => {
        if(contact.author === isbn) {
          contacts.splice(index, 1);
        }
      });
  
      localStorage.setItem('contacts', JSON.stringify(contacts));
  }
}


document.addEventListener('DOMContentLoaded',UI.displayBooks);

document.querySelector('#book-form').addEventListener('submit',(e) => {
  

  e.preventDefault();

 
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;

  if(title === '' || author === ''){
      UI.showAlerts('Please fill in all details...','danger');
  } else {
      
      const contact = new Contact(title,author);

    
      UI.addBookToList(contact);

     
      Store.saveBook(contact);
 
      UI.clearFields();
  }

});

document.querySelector('#search-form').addEventListener('submit',(e) => {
  

  e.preventDefault();

  var contact = document.querySelector('#search').value;

  var test = document.getElementById("search").value;

  UI.rechercheContact(test);
});


document.querySelector('#book-list').addEventListener('click',(e) => {
  UI.deleteBook(e.target);

  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});



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
    var arr = new Uint8Array((len || 175) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join('');
  }
function genererCle(){
    document.getElementById("title").value = generateId();
}

function envoyerMessage(){

  const message = document.getElementById("message").value;
  const author = document.getElementById("message").value;


  const messages = new Message(message,author);

    
  UI_Message.addMessageToList(messages);
 
  StoreMessage.saveMessage(messages);
}

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
