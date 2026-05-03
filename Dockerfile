# Статический экспорт: `npm run build:full` — полный бандл с WebGL (Three.js) для заливки в `out/`.
FROM node:20-bookworm-slim AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS=--max-old-space-size=8192

RUN npm run build:full

# Артефакт: только папка out (забрать через docker build + docker run см. scripts/docker-export.ps1)
