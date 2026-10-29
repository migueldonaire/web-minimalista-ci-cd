# Servidor web Nginx con los ficheros de la web
FROM nginx:1.30-alpine
ARG VERSION=dev

# Copiamos solo lo que forma parte de la web (no todo el proyecto)
COPY index.html contacto.html /usr/share/nginx/html/
COPY css /usr/share/nginx/html/css
COPY js /usr/share/nginx/html/js
RUN echo "$VERSION" > /usr/share/nginx/html/version.txt

# Sonar avisa de que la imagen de Nginx arranca como root.
# Revisado y aceptado en SonarQube Cloud (Accepted): es una web estática
# sin datos de usuarios ni secretos dentro de la imagen.
