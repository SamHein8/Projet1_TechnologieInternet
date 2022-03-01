
window.onload = function load(){
    document.getElementById("mesMessages").style.display = "none";
    document.getElementById("nouveauContact").style.display = "none";
    document.getElementById("composer").style.display = "none";
    //var newMessage = document.getElementById("message");

    /*function jsonCarnetContact(name){
        this.name = name;
    }

    function jsonMessage(newMessage){
        this.newMessage = newMessage;
    }*/
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

      row.innerHTML = `
          <td>${message.contenu}</td>
          <td>${message.author}</td>
          <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;

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

  
  /*static showAlerts(message,className){
    if(message == "Please fill in all details..."){
    alert("Veuillez remplir tous les paramètres..." + "\n"  +message);
    }
    else if(message == "Book Added"){
     // alert("Ajoutez au carnet" + "\n"  +message);
    }
    else if(message == "Book deleted"){
     // alert("Retirez du carnet" + "\n"  +message);
    }


  }*/
}
class StoreMessage {
  static getMessages() {
      let messages;
      if(localStorage.getItem('messages') === null) {
        messages = [];
      } else {
        messages = JSON.parse(localStorage.getItem('messages'));
      }
  
      return messages;
    }

  static saveMessage(message){
      let messages;
      messages = StoreMessage.getMessages();
      messages.push(message);
      localStorage.setItem('messages',JSON.stringify(messages));
  }

  static removeMessage(isbn){
      const messages = StoreMessage.getMessages();

      messages.forEach((message, index) => {
        if(message.author === isbn) {
          messages.splice(index, 1);
        }
      });
  
      localStorage.setItem('messages', JSON.stringify(messages));
  }
}

//document.addEventListener('DOMContentLoaded',UI_Message.displayMessages);

      

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
document.addEventListener('DOMContentLoaded',UI_Message.displayMessages);

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
