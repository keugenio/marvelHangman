	var hash="5545b6f2f668966888319100a93d32c5";
	var publickey = "8a10078d47a38b6a5c7272b337efb398";
	var startsWith;
	var offset;
	var randomCharacterName;
	var randomCharacterNameLength=0;
	var randomIndex=Math.floor((Math.random() * 20) + 1);
	var answerArray, guessArray, allGuessArray = [];
	var incorrectGuessAmt=0;
	var guessedLetter="";
	var description=""; 
	var wikiURL = "";
$( document ).ready(function() {
	newGame();

	$("#btnReload").click(function() {
		resetGame();
	  newGame();
	});

});

function resetGame(){
	document.getElementById("messageboard").innerHTML = "";
	randomCharacterName;
	randomCharacterNameLength=0;
	randomIndex=Math.floor((Math.random() * 20) + 1);
	answerArray, guessArray, allGuessArray = [];
	incorrectGuessAmt=0;
	guessedLetter="";
	description=""; 
	wikiURL = "";	
}
function newGame(){
			startsWith = randomLetter();
			offset = getOffSet(startsWith);

			var htmlCall = "http://gateway.marvel.com/v1/public/characters?" + 
											"nameStartsWith=" + startsWith +
										  "&offset=" + offset +
											"&ts=" + 1 +
											"&apikey=" + publickey + 
											"&hash=" + hash;

		  $.ajax({
		    url: htmlCall,
		    method: "GET"
		  }).done(function(dowloadedJSON) {	
		    var characterImage=dowloadedJSON.data.results[randomIndex].thumbnail.path + "/portrait_uncanny.jpg";
		    var copyright = dowloadedJSON.attributionHTML;
		    
		    wikiURL = dowloadedJSON.data.results[randomIndex].urls[0].url;
		    randomCharacterName = dowloadedJSON.data.results[randomIndex].name;
		    description = dowloadedJSON.data.results[randomIndex].description;
				answerArray = randomCharacterName.split('');
				convertToLowerCase(answerArray);
				setupGuessArray();

				jQuery("#marvelCharacterImage").attr("src",characterImage);
				document.getElementById("marvelCharacter").innerHTML = printArray(guessArray);
				document.getElementById("marvelCopyright").innerHTML = copyright;
				document.getElementById("description").innerHTML = description;

		    document.onkeyup = function(event) {
		    	//if key pressed is valid and not already in the all guessed array
					if(isValidKey(event.key) && allGuessArray.indexOf(event.key) < 0){    	
			      evaluateGuess(event.key);
			      updateMessageBoard();
		    	}
		    	document.getElementById("instructions").style.display = "none";
		    };
			});	
}
function isValidKey(str) {
  return str.length === 1 && str.match(/[0-9a-z]/i);
}

function randomLetter() {
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyz";

    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function getOffSet(letter){
	var maxReturnedCharacters = 20;

		switch(letter){
		case 'a':
			return Math.floor((Math.random() * (79-maxReturnedCharacters)));
			break;
		case 'b':
			return Math.floor((Math.random() * (92-maxReturnedCharacters)));
			break;
		case 'c':
			return Math.floor((Math.random() * (100-maxReturnedCharacters)));
			break;
		case 'd':
			return Math.floor((Math.random() * (78-maxReturnedCharacters)));
			break;
		case 'e':
			return Math.floor((Math.random() * (33-maxReturnedCharacters)));
			break;
		case 'f':
			return Math.floor((Math.random() * (37-maxReturnedCharacters)));
			break;
		case 'g':
			return Math.floor((Math.random() * (56-maxReturnedCharacters)));
			break;
		case 'h':
			return Math.floor((Math.random() * (70-maxReturnedCharacters)));
			break;
		case 'i':
			return Math.floor((Math.random() * (38-maxReturnedCharacters)));
			break;
		case 'j':
			return Math.floor((Math.random() * (44-maxReturnedCharacters)));
			break;
		case 'k':
			return Math.floor((Math.random() * (34-maxReturnedCharacters)));
			break;
		case 'l':
			return Math.floor((Math.random() * (54-maxReturnedCharacters)));
			break;
		case 'm':
			return Math.floor((Math.random() * (152-maxReturnedCharacters)));
			break;
		case 'n':
			return Math.floor((Math.random() * (43-maxReturnedCharacters)));
			break;
		case 'o':
			return 0; //only 19 characters no offset needed
			break;
		case 'p':
			return Math.floor((Math.random() * (61-maxReturnedCharacters)));
			break;
		case 'q':
			return 0; // only 8 characters no offset needed
			break
		case 'r':
			return Math.floor((Math.random() * (59-maxReturnedCharacters)));
			break;
		case 's':
			return Math.floor((Math.random() * (196-maxReturnedCharacters)));
			break;
		case 't':
			return Math.floor((Math.random() * (92-maxReturnedCharacters)));
			break;
		case 'u':
			return Math.floor((Math.random() * (21-maxReturnedCharacters)));
			break;
		case 'v':
			return Math.floor((Math.random() * (32-maxReturnedCharacters)));
			break;
		case 'w':
			return Math.floor((Math.random() * (57-maxReturnedCharacters)));
			break;
		case 'x':
			return 0; //only 15 characters no offset needed
			break;
		case 'y':
			return 0; // only 4 characters no offset needed
			break
		case 'z':
			return 0; // only 10 characters no offset needed
			break			
		default	:
			break;
		}
}

function setupGuessArray() {
	// push * as placeholders for letters and numbers. Fill in common characters (spaces, periods, parenthesis etc)
	// so players do not need to guess those
	var temp = [];
	for (var i = 0; i < answerArray.length; i++) {
		switch (answerArray[i]){
			case " ":
				temp.push(" ");
				break;
			case "(":
				temp.push("(");
				break;
			case ")":
				temp.push(")");
				break;
			case "'":
				temp.push("'");
				break;
			case ".":
				temp.push(".");				
				break;				
			case "-":
				temp.push("-");				
				break;				
			default:
				temp.push("*");
				randomCharacterNameLength++;
		}

	}
	guessArray = temp;
}

function evaluateGuess(guess){
	var indexOfGuess=answerArray.indexOf(guess);

	if (randomCharacterNameLength == 0){
		alert ("name guessed!")
		document.onkeyup = null;
	} 
	else{
		if (indexOfGuess>=0){
			// fill all array elements with the guessed letter
			for(var i=0; i<answerArray.length;i++) {
	    	if (answerArray[i] == guess) {
	    		guessArray[i] = guess;
	    		randomCharacterNameLength--;
	    	}

			}
	    	if (randomCharacterNameLength == 0){
					alert ("name guessed!")
					document.onkeyup = null;	

					document.getElementById("description").innerHTML= randomCharacterName;
					if (description){
						document.getElementById("description").innerHTML += ": " + description;
					}	
					else{
						 document.getElementById("description").innerHTML += "<a href='" + wikiURL + "' target='blank'>" + " (more info)"  +"</a> ";
					}
			
					document.getElementById('guessType').innerHTML="";		
				}
				document.getElementById("marvelCharacter").innerHTML=printArray(guessArray);
		} else{
			// only update incorrect guess amount for new guesses
			if (allGuessArray.indexOf(guess)<=0 ){
				incorrectGuessAmt++;
			}
		}

		if (allGuessArray.indexOf(guess)<0){
			allGuessArray.push(guess);
		}
	}
}

function convertToLowerCase(anArray){
	for (var i = 0; i < anArray.length; i++) {
		anArray[i] = anArray[i].toLowerCase();
	}
}
// updates incorrect guessed amount and all letters chosen so far
function updateMessageBoard(){
	var message="";
	message += "<p> Incorrect guessed amount: " + incorrectGuessAmt + "<br>";
	message += "All guessed letters: " + allGuessArray.toString() + "<br></p>";
	document.getElementById("messageboard").innerHTML = message;
}

// takes given array and returns as string
function printArray(anArray) {
	var arrayString="";

	for (var i = 0; i < anArray.length; i++) {
		arrayString+=anArray[i];
	}
	return arrayString;
}