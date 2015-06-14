OISC=function(P,O){for(p=0,_=[];p>-1;p=(P[p+1]<0)?(O(B),P[p+3]):((_[P[p+1]]-=B)>0)?p+4:P[p+3])B=P[p]?P[p+2]:_[P[p+2]];}
OISC(
[1,-1,72,4,1,-1,105,8,1,-1,33,-1],
function(_){write(String.fromCharCode(_))}
);
