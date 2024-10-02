# Fáze pro frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend

# Zkopíruj package.json a nainstaluj závislosti
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

# Zkopíruj veškeré zdrojové soubory a sestav frontend
COPY frontend/ ./
RUN npm run build

# Fáze pro backend
FROM node:18-alpine AS backend-build
WORKDIR /app/backend

# Zkopíruj package.json a nainstaluj závislosti
COPY backend/package.json backend/package-lock.json ./
RUN npm install
COPY backend/config.env .env
# Zkopíruj veškeré zdrojové soubory backendu
COPY backend/ ./

# Spusť backend
CMD ["npm", "start"]

# Zkombinujeme obě části

