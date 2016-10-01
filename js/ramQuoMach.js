/*Ramdon Quote Machine / Diego Herrera 2016*/

/* Var to store Api Json Response*/
var myArr;

var boton=document.getElementById('new-quote');
boton.addEventListener('click',function(){


getQuote();


},false);

 
       

function getQuote(){

  /*random number to include in the url request, this is for
  get ramdon quotes see Api Documentation*/ 

  var keyDiego=Math.ceil(Math.random()*(999999-1)+1);
  var xmlhttp = new XMLHttpRequest();
  /*using a proxy to reach the appi serveer https://crossorigin.me*/
  var url ="https://crossorigin.me/http://api.forismatic.com/api/1.0/?method=getQuote&key="+keyDiego+"&format=json&lang=en";



  xmlhttp.onreadystatechange = function() {

  if (this.readyState == 4 && this.status == 200) {
   myArr = JSON.parse(this.responseText);     
        render(myArr)
   }    
  };
    
  xmlhttp.open("GET", url, true);
  xmlhttp.send();

}

/*render the quotes*/

function render(myArr){

  var quote=document.getElementById("quote"); 
  quote.innerText=myArr.quoteText;
  var $divAut=document.createElement("div");
  $divAut.setAttribute("id", "author");

  $divAut.innerText=(function() {
  /*if the quote don't have author set default value*/
  return myArr.quoteAuthor ? myArr.quoteAuthor : "Anonimo";

 }());

 quote.appendChild($divAut); 
}

var tweet=document.getElementById("tweet");
tweet.addEventListener('click',function(){

  tweetOut();

});

function tweetOut(){

  var quote=document.getElementById('quote').innerText;
  quote=quote.split("");

  if(quote.length>140){
    
    alert("More than 140 characters!");
  }

  if(quote!==""){

    var winCon=window.screenX;

    var top = ((screen.availHeight/2)-(550/2));
    var left= ((screen.availWidth/2)-(300/2));

    var height=300;
    var width=550;
    var myTweet=myArr.quoteText+"Autor:"+myArr.quoteAuthor;
    var popTw=window.open("https://twitter.com/intent/tweet?text="+"  "+myTweet+"'",'_blank',"width=550,height=300,scrollbars=NO,top="+top+",left="+left+"'");

    var windowHeight = popTw.screenX;
     popTw.moveTo(windowHeight,windowWidth);
  }
  else{
    alert("You should ask for a quote before!");
  }
}