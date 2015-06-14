#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <dirent.h>
#include <unistd.h>
#include <errno.h>
// :define
// $title
// |text
// >name,where
// @ colour
char fcolour[256];
char bcolour[256];
FILE *curr = NULL;
#define out(STR) fprintf(curr,"%s",STR)
void beginfile() {
	out("<html><body style=\"background-color:");
	out(bcolour);
	out(";color:");
	out(fcolour);
	out(";\"><center><pre>");
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
		case '@': {
			char *fore;
			fore = strchr(line + 1,',');
			*fore = '\0';
			fore++;
			strcpy(fcolour,fore);
			strcpy(bcolour,line + 1);
		}
		break;
		case '\r':
		case '\n':
		case '\0':
		case '#':
			//do nothing
		break;
		default:
			exit(-1);
	}
}
int main() {
	DIR *d = NULL;
	struct dirent *entry = NULL;
	FILE *file;
	char name[256] = "in/";
	char buf[256];
	
	d = opendir("in");
	
	while((entry = readdir(d))) {
		if(entry->d_name[0] == '.') continue;
		
		strcpy(name + 3,entry->d_name);
		file = fopen(name,"r");
		
		while(fgets(buf,sizeof(buf),file)) {
			buf[strlen(buf) - 1] = '\0';
			compline(buf);
		}
		
		fclose(file);
	}
	endfile();
}