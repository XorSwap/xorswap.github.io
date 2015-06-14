from random import choice
import sys
def makehash(I,L):
	O={}
	N=I[:L]
	for str in I[L:]:
		if N not in O:
			O[N]=[str]
		else:
			O[N].append(str)
		N=N[1:]+str
	return O
F=""
for file in sys.argv[1:]:
	F+=open(file).read()
H=makehash(F,9)
#open("hash.txt",'w').write(str(H))
N=choice(H.keys())
for _ in range(len(F)):
	sys.stdout.write(N[0])
	while N not in H:
		N=choice(H.keys())
	N=N[1:]+choice(H[N])
print('.')