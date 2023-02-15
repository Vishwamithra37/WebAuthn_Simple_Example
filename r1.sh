openssl req -new -newkey rsa:2048 -nodes -keyout jtbi.galam.in.key -out jtbi.galam.in.csr
openssl x509 -signkey jtbi.galam.in.key -in jtbi.galam.in.csr -req -days 3650 -out jtbi.galam.in.crt
