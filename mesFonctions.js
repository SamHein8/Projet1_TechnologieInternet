
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

class Book {
  constructor(title,author){
      this.title = title;
      this.author = author;
  }
}


class UI {


  static displayBooks(){
      let books = Store.getBooks();

      books.forEach((book) => UI.addBookToList(book));

     
  }

  static addBookToList(book){
      const list = document.querySelector('#book-list');

      const row = document.createElement('tr');

      row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;

      list.appendChild(row);
  }


  static clearFields(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
  }

 
  static deleteBook(el){
      if(el.classList.contains('delete')){
          el.parentElement.parentElement.remove();
      }
  }

  
  static showAlerts(message,className){
    
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
     
      div.appendChild(document.createTextNode(message));
      
      const container = document.querySelector('.container');
      const form = document.querySelector('#book-form');
      container.insertBefore(div,form);

     
      setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }
}


class Store {
  static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
  
      return books;
    }

  static saveBook(book){
      let books;
      books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books',JSON.stringify(books));
  }

  static removeBook(isbn){
      const books = Store.getBooks();

      books.forEach((book, index) => {
        if(book.isbn === isbn) {
          books.splice(index, 1);
        }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
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
      
      const book = new Book(title,author);

    
      UI.addBookToList(book);

     
      Store.saveBook(book);

 
      UI.showAlerts('Book Added','success');

 
      UI.clearFields();
  }

});


document.querySelector('#book-list').addEventListener('click',(e) => {
  UI.deleteBook(e.target);

  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  UI.showAlerts('Book Removed','success');
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
    var arr = new Uint8Array((len || 200) / 2);
    window.crypto.getRandomValues(arr);
    return Array.from(arr, dec2hex).join('');
  }
function genererCle(){
    document.getElementById("title").value = generateId();
}

/*function ajouterAuCarnet(){
    var form  = document.getElementById('contact');
    if(!window.contactList){ //check if we already have a contact list
        window.contactList=$ab(form.person.value,form.email.value);
       } else {
       //saves new values rather than deleting old ones as well
         contactList.addNewContact(form.person.value,form.email.value);
       }
       
         form.person.value = '';
         form.email.value = '';
       
        event.preventDefault();
}
*/

/*function afficherCarnet(){
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

    }
    var messagecarnet =  window.localStorage.getItem("carnet");
    document.getElementById("mesContacts").innerHTML = messagecarnet;

}*/

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
    if(!window.contactList){ //check if we already have a contact list
        window.contactList=$ab(form.person.value,form.email.value);
       } else {
       //saves new values rather than deleting old ones as well
         contactList.addNewContact(form.person.value,form.email.value);
       }
       
         form.person.value = '';
         form.email.value = '';
       
        event.preventDefault();
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
    if(window.contactList){ //check if we already have a contact list
        document.getElementById('mesContacts').innerHTML = '';
      var contacts = contactList.returnAll();
       console.log(contacts);
       if(contacts.length>0){
         for(var i = 0;i<contacts.length;i++){
         document.getElementById('mesContacts').innerHTML += '<div class="contact-item">Name:'+contacts[i].name +'<br>Email:'+contacts[i].email+'</div><hr>';
         }
       }else{
         document.getElementById('mesContacts').innerHTML += '<div class="contact-item">You have no contacts. Why not add  a few?</div><hr>';
       }
     }

}
