# Etapa de construcción 
FROM nginx:alpine

# Metadatos
LABEL maintainer="GastoClaro Team"
LABEL description="Container para servir la aplicación GastoClaro"

# Copiar configuración personalizada de Nginx (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Copiar archivos estáticos de la aplicación
COPY . /usr/share/nginx/html/

# Exponer puerto
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]
