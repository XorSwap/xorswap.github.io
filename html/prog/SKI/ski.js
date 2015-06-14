/**
 * name:{args:[...],pattern:[...]}
 * 
 * 
 * 
 * 
 */
function Combinator()
{
	this.combinators={};
}
Combinator.prototype.add=function(name,args,pattern)
{
	this.combinators[name]=
	{
		args:args.split(""),
		pattern:this.fold(this.parse(pattern))
	};
}
Combinator.prototype.eval=function(string)
{
	writeln("Combinators: "+JSON.stringify(this.combinators));
	program=this.fold(this.parse(string));
	var old;
	do
	{
		old=program;
		program=this.step(program);
	}while(program != old);
	return program;
}
// TECHNICAL
Combinator.prototype.parse=function(input)
{
	function chomp()
	{
		tmp=i;
		q=0;
		do
		{
			if(input.charAt(i)==='(')q++;
			if(input.charAt(i)===')')q--;
			i++;
		}while(q>0);
		i--;
		return input.slice(tmp+1,i);
	}
	function recurse(inp)
	{
		ret=[];
		for(i=0;i<inp.length;i++)
		{
			if(inp.charAt(i)==='(')
			{
				str=chomp(inp);
				_ret.push(ret);
				_i.push(i);
				X=recurse(str);
				ret=_ret.pop();
				i=_i.pop();
				ret.push(X);
			}
			else
				ret.push(inp.charAt(i));
		}
		return ret;
	}
	_ret=[];
	_i=[];
	return recurse(input);
}
Combinator.prototype.fold=function(input)
{
	return input.reduce(function(H,T)
	{
		if(T instanceof Array)
			T=this.fold(T);
		return [H,T];
	});
}
Combinator.prototype.step=function(input)
{
	return input;
}
/////////////////////////
function step(I)
{
 if(I[0][0][0]==="S")
 {
  X=I[0][0][1];
  Y=I[0][1];
  Z=I[1];
  return [[X,Z],[Y,Z]];
 }
 if(I[0][0]==="K")
 {
  X=I[0][1];
  return X;
 }
 if(I[0]==="I")
 {
  X=I[1];
  return X;
 }
 return I;
}
function run(I)
{
 var old;
 do
 {
  old=I;
  I=step(I);
 }while(old != I);
 return I;
}
function chomp(I)
{
 q=0;
 l=i;
 do
 {
  if(I.charAt(i)==='(')q++;
  if(I.charAt(i)===')')q--;
  i++;
 }while(q > 0);
 return I.slice(l+1,i-1);
}
function parse(I)
{
 ret=[];
 for(i=0;i<I.length;i++)
 {
  writeln("ret: "+ret);
  if(I.charAt(i) === '(')
  {
   str=chomp(I);
   writeln("?> "+str);
   Sret.push(ret);
   Si.push(i);
   X=parse(str);
   writeln("sret: "+Sret);
   ret=Sret.pop();
   i=Si.pop();
   ret.push(X);
  }
  else
   ret.push(I.charAt(i));
 }
 return ret;
}
function fold(I)
{
 return I.reduce(function(H,T)
 {
  if(T instanceof Array)
   T=fold(T);
  return [H,T];
 });
}
function combine(I)
{
	ret="";
	s=[];
	function recurse()
	{
		ret="";
	}
	recurse();
	return ret;
}
function go(I)
{
	Sret=[];
	Si=[];
	return combine(run(fold(parse(I))));
}
function load()
{
	comb=new Combinator();
	//comb.add('S',"xyz","xz(yz)");
	//comb.add('K',"xy","x");
	//comb.add('I',"x","x");
	comb.add('O',"x","xx");
	writeln(JSON.stringify(comb.eval("Oj")));
}