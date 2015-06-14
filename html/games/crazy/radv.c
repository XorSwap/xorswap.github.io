char next();
#define NODES 2048
char names[NODES][32] = {{'\0'}};
void getword(char buf[32]) {
	char c;
	int i;
	while(!isalpha(c = next()));
	buf[0] = c;
	for(i = 1; isalpha(c = next()) && i < 31; i++)
		buf[i] = c;
	buf[i] = '\0';
}
void getphrase(char buf[1024]) {
	char c;
	int i;
	while(!isupper(c = next()));
	buf[0] = c;
	for(i = 1; (c = next()) != '\n' && c != '\r' && i < 1023; i++) {
		buf[i] = c;
		if(c == '?' || c == '!' || c == '.') { i++; break; }
	}
	buf[i] = '\0';
}
int main() {
	char buf[1024];
	for(int i = 0; i < NODES; i++)
		getword(names[i]);
	for(int i = 0; i < NODES; i++) {
		printf(":st_%i\n",i); // name
		printf("$%s\n",names[i]); // title
		do { // texts
			getphrase(buf);
			printf("|%s\n",buf);
		} while(rand() & 1);
		do {
			int next = rand() % NODES;
			printf(">%s>st_%i\n",names[next],next);
		} while(rand() & 1);
	}
}