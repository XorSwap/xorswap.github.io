function login()
{
	V=document.getElementById("input").value;
	document.getElementById("_").innerHTML="Welcome, "+document.getElementById("input").value+"!"
}
function register()
{
	location.href="index.html"
}
function focus(_)
{
	alert('');
	document.getElementById(_).value='';
}
function blur(_,X)
{
	_=document.getElementById(_);
	if(_.value=='')
		_.value=X;
}
/*

	((chr>='A'&&char<='Z')||(!(chr>='a'&&chr<='z')&&chr!=','))


	tHis is a sTrange message,
	meanT to confuse People:

	//this is a comment

	you are currently viewing ip
	number 142.161.61.68,
	which is a web server / thingy
	which i do and stuffs

	o_o

	its a pretty strange webpage, that

*/
