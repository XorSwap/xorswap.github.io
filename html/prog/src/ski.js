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
   //60
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
function go(I)
{
	Sret=[];
	Si=[];
	return combine(run(fold(parse(I))));
}