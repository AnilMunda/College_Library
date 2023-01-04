console.log("welcome to es6 version");

class Book {
  constructor(bookName, author, bookId, type) {
    this.name = bookName;
    this.author = author;
    this.bookId = bookId;
    this.type = type;
  }
}

 function add() 
{
    console.log("added to UI");

   let bookData = localStorage.getItem("bookData");

   if (bookData == null) {
     bookDataObj = [];
   } 
   else {
     bookDataObj = JSON.parse(bookData);
   }
 
   let uiString;
   bookDataObj.forEach(function (element) {
     uiString = `<tr>
       <td>${element.name}</td>
       <td>${element.author}</td>
       <td>${element.type}</td>
     </tr>`;
   });

   let tableBody = document.getElementById("tableRow");

   tableBody.innerHTML += uiString;
  }

//for displaying in UI
class Display {
  

  clear() {
    let elem = document.getElementById("addBook");
    elem.reset();
  }

    validate(book) {
    if (book.name.length < 2 || book.author.length < 2 || book.bookId < 2) {
      return false;
    } else return true;
  }

   show(status,givenMsg) {
    let message = document.getElementById("message");
    message.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
       <strong>${status}:</strong> ${givenMsg}
       <button type="button" class="close" data-dismiss="alert" aria-label="Close">
         <span aria-hidden="true">&times;</span>
       </button>
     </div>`;
  
     setTimeout(function(){
      message.innerHTML=``},2000);
  }
}


// add event listner to submit;
let ele = document.getElementById("addBook");
ele.addEventListener("submit", submitBook);
function submitBook(e) {


  console.log("form is submitted");
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;
  let bookId = document.getElementById("bookId").value;

  //finance,programing,others
  let finance = document.getElementById("finance");
  let programming = document.getElementById("programming");
  let otherCat = document.getElementById("otherCat");

  let type;

  if (finance.checked) {
    type = finance.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (otherCat.checked) {
    type = otherCat.value;
  }

  let book = new Book(name, author, bookId, type);
  console.log(book);


    // making a variable for localstorage
  let bookData = localStorage.getItem("bookData");

  if (bookData == null) {
    bookDataObj = [];
  } 
  else {
    bookDataObj = JSON.parse(bookData);
  }

  bookDataObj.push(book);


  let display = new Display();

  if (display.validate(book)) {
    
      localStorage.setItem("bookData",JSON.stringify(bookDataObj));
      display.clear();
      display.show('sucess','your book added');
      add();
    //   display.add(book);
    } else {
        display.show('oops','book not added !!');
    }
    
    e.preventDefault();
}
