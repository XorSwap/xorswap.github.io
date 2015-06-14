gotten=false;
H={};
function hash(I,L)
{
	O={};
	N=I.slice(0,L);
	for(str=L;str<I.length;str++)
	{
		if(N in O)
			O[N].push(I[str]);
		else
			O[N]=[I[str]];
		N=N.slice(1)+I[str];
	}
	return O;
}
function markov(callback)
{
	function end(X)
	{
		return X=='.'||X=='!'||X=='?';
	}
	function choose(obj)
	{
		var result;
		var count = 0;
		for (var prop in obj)
		if (Math.random() < 1/++count)
			result = prop;
		return result;
	}
	function isUpper(X)
	{
		return X.charCodeAt() <= 'Z'.charCodeAt() && X.charCodeAt() >= 'A'.charCodeAt()
	}
	function isLower(X)
	{
		return X.charCodeAt() <= 'z'.charCodeAt() && X.charCodeAt() >= 'a'.charCodeAt()
	}
	O="";
	do
	{
		O="";
		do
			N=choose(H);
		while(!( isUpper(N[0]) && isLower(N[1]) ));
		while(!end(N[0]))
		{
			O+=N[0];
			N=N.slice(1)+H[N][Math.floor(Math.random()*H[N].length)];
		}
	}while(O.length > 139);
	callback(O+'.');
}
function go()
{
	if(!gotten)
		$.get("macbeth.txt",function(_)
		{
			H=hash(_,8);
			$('#_').html("");
			markov(function(I){$('#_').append(I);});
			$('#_').append('<br/>');
			gotten=true;
		});
	else
	{
		$('#_').html("");
		markov(function(I){$('#_').append(I);});
		$('#_').append('<br/>');
	}
}
