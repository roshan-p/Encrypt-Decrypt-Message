// Encrypt
function message() {
	this.secret_message = null;
	this.secret_key=null;
	this.EliasDecryptKey="elias123"
	this.BrookDecryptKey="brook123"
	this.JohnDecryptKey="john123"
	this.msgAtElias=null;
	this.msgAtBrook=null;
	this.msgAtJohn=null;

}

message.prototype.EliasEncrypt = function (message,key){
	this.secret_key = key
	this.secret_message = CryptoJS.AES.encrypt(message, this.secret_key);
	// this.secret_key = this.secret_key+this.JohnDecryptKey;
}
message.prototype.EliasDecrypt = function (){
	let  key = this.secret_key.replace(this.EliasDecryptKey,"");
	let bytes = CryptoJS.AES.decrypt(this.secret_message.toString(),this.secret_key);
	let toText = bytes.toString(CryptoJS.enc.Utf8);
	if(toText==''){
		//console.log("You can't read this!")
		document.getElementById('messagefield').innerHTML = "Elias can't read this!";
	}else{
		//console.log(toText)
		document.getElementById('messagefield').innerHTML = toText
	}
}
message.prototype.BrookDecrypt = function (){
	let  key = this.secret_key.replace(this.BrookDecryptKey,"");
	let bytes = CryptoJS.AES.decrypt(this.secret_message.toString(),this.secret_key);
	let toText = bytes.toString(CryptoJS.enc.Utf8);
	if(toText==''){
		document.getElementById('messagefield').innerHTML = "Brook can't read this!";
		//console.log("Brook can't read this!")
	}else{
		document.getElementById('messagefield').innerHTML = toText;
		//console.log(toText)
	}

}
message.prototype.JohnDecrypt = function (){
	let  key = this.secret_key.replace(this.JohnDecryptKey,"");
	let bytes = CryptoJS.AES.decrypt(this.secret_message.toString(),key);
	let toText = bytes.toString(CryptoJS.enc.Utf8);
	if(toText==''){
		document.getElementById('messagefield').innerHTML = "You can't read this!";
		//console.log("You can't read this!")
	}else{
		document.getElementById('messagefield').innerHTML = toText;
		//console.log(toText)
	}

}

let msg = new message();
let brookGet = 0;
let johnGet = 0;
msg.EliasEncrypt('John, I wait you in library.','secretKey')

function eliasRead(){
	msg.EliasDecrypt()

}
function eliasPassToBrook(){
	//console.log(msg.secret_key)
	if(brookGet!=1){
		msg.secret_key=msg.secret_key+msg.JohnDecryptKey;
	}
	brookGet=1;
	//console.log(msg.secret_key)

}
function brookRead(){
	if(brookGet ==1){
		msg.BrookDecrypt();
	}else{
		//console.log('Brook have not got the message.')
		document.getElementById('messagefield').innerHTML = "Brook have not got the message.";
	}
}
function brookPassToJohn(){
	if(brookGet==1){
		johnGet=1;
	}
}
function johnRead(){
	if(johnGet==1){
		msg.JohnDecrypt();
	}else{
		document.getElementById('messagefield').innerHTML = "John have not got the message.";
		//console.log('John have not got the message.')
	}
}
// msg.EliasEncrypt('John, I wait you in library.','secretKey')
// msg.EliasDecrypt()
// msg.BrookDecrypt();
// msg.JohnDecrypt();


// let bytes = CryptoJS.AES.decrypt(message.toString(), 'onlyJohn');
// let toText = bytes.toString(CryptoJS.enc.Utf8);

//console.log(toText);