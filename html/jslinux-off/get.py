import os;
for line in open("files.txt"):
	os.system("wget http://bellard.org/jslinux/"+line);