_=[];
R=[];
function UNDERLOAD(P,F,O)
{
	for(i=0;i<P.length;i++)
	{
		switch(P[i])
		{
			case F.dup:
				X=_.pop();
				_.push(X);
				_.push(X);
			break;

			case F.quote:
				_.push('('+_.pop()+')');
			break;

			case F.out:
				O(_.pop());
			break;

			case F.drop:
				_.pop();
			break;

			case F.cat:
				X=_.pop();
				Y=_.pop();
				_.push(Y+X);
			break;
			
			case F.swap:
				X=_.pop();
				Y=_.pop();
				_.push(X);
				_.push(Y);
			break;

			case F.exec:
				R.push(i);
				UNDERLOAD(_.pop(),F,O);
				i=R.pop();
			break;

			case F.open:
				d=i;
				c=0;
				do
				{
					if(P[i]==F.open)
						c++;
					else
						if(P[i]==F.close)
							c--;
					i++;
				}
				while(c!=0);
				i--;
				_.push(P.slice(d+1,i));
			break;
		}
	}
}
UNDERLOAD("(x)(::**)^S",
{
	dup   : ':',
	quote : 'a',
	out   : 'S',
	drop  : '!',
	cat   : '*',
	swap  : '~',
	exec  : '^',
	open  : '(',
	close : ')',
},write);
//succ (:)~*(*)*
//pred :(:)~^~(*)~^(!!()())~**
//+ a~a(:)~*~(^~)~*(^*)**
//- a~a~(:(:)~^~(*)~^(!!()())~**)a~**^^^^
//* *
//^ ^
//(X)( : (:*) ^~ (:*) ^* )^S
/*
_=[];R=[];function U(P,O){eval("for(i=0;i<P.length;i++)C:')?(AX=B),AX)):Ca')?(A'('+B+')')):CS')?(O(B)):C!')?(B):C*')?(X=B,Y=B,AY+X)):C~')?(X=B,Y=B,AX),AY)):C^')?(R.push(i),U(B,O),i=R.pop()):C(')?((function(){d=i,c=0;doC(')?c++:C)')?c--:0)),i++;while(c);i--;AP.slice(d+1,i));})()):0))))))));".replace(/A/g,"_.push(").replace(/B/g,"_.pop()").replace(/C/g,"((P[i]=='"));}
*/