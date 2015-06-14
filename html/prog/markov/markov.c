#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#define FORALL(VAR) \
	for(int VAR##_i = 0; VAR##_i < 8191; VAR##_i++) \
		for(struct bucket *VAR = ht[VAR##_i]; VAR != NULL; VAR = VAR->next)
struct bucket {
	struct bucket *next;
	char key[9];
	unsigned int chars[256];
	unsigned int nexts[256];
	unsigned int id;
	unsigned int len;
};
struct bucket *ht[8191];
unsigned int hash(char *str)
{
	unsigned int hash = 5381;
	int c;
	while((c = *str++))
		hash = (hash << 5) + hash + c;
	return hash;
}
struct bucket *ht_get(char key[9]) {
	unsigned int id = hash(key) % 8191;
	struct bucket *curr = ht[id];
	while(curr != NULL) {
		if(strcmp(curr->key,key) == 0)
			return curr;
		curr = curr->next;
	}
	return NULL;
}
struct bucket *ht_new(char key[9]) {
	unsigned int id = hash(key) % 8191;
	struct bucket *new = malloc(sizeof(struct bucket));
	memset(new->chars,0,256 * sizeof(int));
	new->key[0] = key[0];
	new->key[1] = key[1];
	new->key[2] = key[2];
	new->key[3] = key[3];
	new->key[4] = key[4];
	new->key[5] = key[5];
	new->key[6] = key[6];
	new->key[7] = key[7];
	new->key[8] = '\0';
	new->len = 0;
	new->next = ht[id];
	ht[id] = new;
	return new;
}
void genhash() {
	char window[9];
	struct bucket *b;
	int c;
	window[0] = getchar();
	window[1] = getchar();
	window[2] = getchar();
	window[3] = getchar();
	window[4] = getchar();
	window[5] = getchar();
	window[6] = getchar();
	window[7] = getchar();
	window[8] = '\0';
	while((c = getchar()) != EOF) {
		if((b = ht_get(window)) == NULL)
			b = ht_new(window);
		b->len++;
		b->chars[c]++;
		window[0] = window[1];
		window[1] = window[2];
		window[2] = window[3];
		window[3] = window[4];
		window[4] = window[5];
		window[5] = window[6];
		window[6] = window[7];
		window[7] = c;
	}
}
unsigned int totid = 0;
void conv() {
	FORALL(curr) {
		curr->id = totid;
		totid++;
	}
	
	char window[9];
	window[8] = '\0';
	FORALL(curr) {
		window[0] = curr->key[1];
		window[1] = curr->key[2];
		window[2] = curr->key[3];
		window[3] = curr->key[4];
		window[4] = curr->key[5];
		window[5] = curr->key[6];
		window[6] = curr->key[7];
		for(int i = 0; i < 256; i++) {
			window[7] = i;
			struct bucket *b;
			curr->nexts[i] = (b = ht_get(window)) == NULL ? 0 : b->id;
		}
	}
}
void printhash() {
	printf(
		"struct state {\n"
		"	char c;\n"
		"	int len;\n"
		"	int *nexts;\n"
		"};\n"
	);
	FORALL(curr) {
		printf("unsigned int t_%i[] = {",curr->id);
		for(int i = 0; i < 256; i++) {
			for(int j = 0; j < curr->chars[i]; j++) {
				printf("%i,",curr->nexts[i]);
			}
		}
		printf("};\n");
	}
	printf("struct state tab[] = {\n");
	FORALL(curr) {
		printf("\t{%i,%i,t_%i},\n",curr->key[0],curr->len,curr->id);
	}
	printf("};\n");
	printf("int main() {\n");
	printf("\tunsigned int c = rand() %% %i;\n",totid);
	printf("\tfor(;;) {\n");
	printf("\t\tputchar(tab[c].c);\n");
	printf("\t\tc = tab[c].nexts[rand() %% tab[c].len];\n");
	printf("\t}\n");
	printf("\treturn 0;\n");
	printf("}\n");
}
void printc() {
	printf("typedef void *(*func)();");
	FORALL(curr) {
		printf("void *st_%i();\n",curr->id);
	}
	FORALL(curr) {
		printf("void *st_%i() {\n",curr->id);
		printf("\tputchar(%i);\n",curr->key[0]);
		printf("\tfunc nexts[] = {",curr->id);
		for(int i = 0; i < 256; i++) {
			for(int j = 0; j < curr->chars[i]; j++) {
				printf("st_%i,",curr->nexts[i]);
			}
		}
		printf("};\n");
		printf("\treturn (void*)nexts[rand() %% %i];\n",curr->len);
		printf("}");
	}
	printf("int main() {");
	printf("\tfunc c = st_0;");
	printf("\tfor(;;) c = (func)c();\n");
	printf("}");
}
void printjs() {
	FORALL(curr) {
		printf("st_%i = function() {\n",curr->id);
		printf("\tprocess.stdout.write(String.fromCharCode(%i));\n",curr->key[0]);
		printf("\treturn [",curr->id);
		for(int i = 0; i < 256; i++) {
			for(int j = 0; j < curr->chars[i]; j++) {
				printf("st_%i,",curr->nexts[i]);
			}
		}
		printf("][Math.floor(Math.random() * %i)];\n",curr->len);
		printf("}\n");
	}
	printf("c = st_0;\n");
	printf("for(;;) c = c();");
}
void print() {
	FORALL(curr) {
		printf("(%i ",curr->key[0]);
		printf("(",curr->id);
		for(int i = 0; i < 256; i++) {
			for(int j = 0; j < curr->chars[i]; j++) {
				printf("st_%i ",curr->nexts[i]);
			}
		}
		printf(") %i)\n",curr->len);
	}
}
void freehash() {
	for(int i = 0; i < 8191; i++) {
		struct bucket *curr = ht[i];
		struct bucket *tmp;
		while(curr != NULL) {
			tmp = curr->next;
			free(curr);
			curr = tmp;
		}
	}
}
int main() {
	fprintf(stderr,"CREATING HASH...\n");
	genhash();
	fprintf(stderr,"GENERATING TABLE...\n");
	conv();
	fprintf(stderr,"WRITING C FILE...\n");
	printhash();
	fprintf(stderr,"FREEING USED MEMORY...\n");
	freehash();
	fprintf(stderr,"DONE!\n");
}