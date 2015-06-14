#include <stdio.h>
#include <stdlib.h>
#include <string.h>
// :define
// $title
// |text
// >name,where
FILE *curr = NULL;
#define out(STR) fprintf(curr,"%s",STR)
void beginfile() {
	out("<html><body><center><pre>");
}
void endfile() {
	out("</pre></center></body></html>");
}
void newfile(char *name) {
	char buf[256];
	if(curr != NULL) {
		endfile();
		fclose(curr);
	}
	sprintf(buf,"dat/%s.html",name);
	if((curr = fopen(buf,"w")) == NULL) {
		printf("cannot create file %s",buf);
		exit(-2);
	}
	beginfile();
}
void compline(char *line) {
	switch(*line) {
		case ':':
			newfile(line + 1);
		break;
		case '$':
			out("<h3>");
			out(line + 1);
			out("</h3>");
		break;
		case '|':
			out(line + 1);
			out("<br/>");
		break;
		case '>': {
			char *where;
			where = strchr(line + 1,'>');
			*where = '\0';
			where++;
			out("<a href=\"");
			out(where);
			out(".html\">");
			out(line + 1);
			out("</a> ");
		}
		break;
		default:
			exit(-1);
	}
}
int main() {
	char buf[2048];
	while(fgets(buf,sizeof(buf),stdin)) {
		buf[strlen(buf) - 1] = '\0';
		printf("%s\n",buf);
		compline(buf);
	}
	endfile();
}