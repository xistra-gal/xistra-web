# Usar Node.js 18 como imagen base
FROM node:18-alpine AS base

# Establecer directorio de trabajo
WORKDIR /app

# Instalar dependencias del sistema necesarias
RUN apk add --no-cache libc6-compat

# Etapa de instalación de dependencias
FROM base AS deps

# Copiar archivos de configuración de dependencias
COPY package.json package-lock.json* ./

# Instalar dependencias
RUN npm ci --only=production && npm cache clean --force

# Etapa de desarrollo (para instalar todas las dependencias incluyendo devDependencies)
FROM base AS dev-deps

COPY package.json package-lock.json* ./
RUN npm ci

# Etapa de construcción
FROM base AS builder

# Copiar dependencias instaladas
COPY --from=dev-deps /app/node_modules ./node_modules

# Copiar código fuente
COPY . .

# Configurar variables de entorno para build
ENV NODE_ENV=production

# Construir la aplicación Astro
RUN npm run build

# Etapa de producción
FROM base AS runner

# Crear usuario no-root para seguridad
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 astro

# Establecer directorio de trabajo
WORKDIR /app

# Copiar dependencias de producción
COPY --from=deps /app/node_modules ./node_modules

# Copiar archivos construidos
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json

# Cambiar ownership al usuario astro
RUN chown -R astro:nodejs /app
USER astro

# Exponer el puerto
EXPOSE 4321

# Variables de entorno
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321

# Comando para ejecutar la aplicación
CMD ["node", "./dist/server/entry.mjs"]