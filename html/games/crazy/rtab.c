#define S(ID,CHAR,LEN) {CHAR,LEN,(unsigned int[]){
#define N(W) W,
#define E }},
#define J(I,CHAR,N) {CHAR,1,(unsigned int[]){N}},
struct tab {
	char out;
	unsigned int len;
	unsigned int *next;
};
struct tab tab[] = {
#include "tab.h"
};
char next() {
	static unsigned int ip = 0;
	ip = tab[ip].next[rand() % tab[ip].len];
	return tab[ip].out;
}