# Proyectos de DevOps

Dos proyectos completos, con todas las sesiones de DevOps aplicadas. Cada carpeta es un repositorio independiente: súbela a su propio repositorio **público** de GitHub, de forma que su carpeta `.github/` quede en la raíz.

| Proyecto | Qué es | Sesiones |
| --- | --- | --- |
| `web-minimalista/` | Web HTML, CSS y JavaScript servida con Nginx | 01 a 04, 06 y 07 |
| `api-express/` | API con Express y TypeScript, tests con Jest | 05 a 07 |

## Qué lleva cada uno

- `.github/workflows/ci.yml`: pipeline de pull request (lint, tests, build, Trivy, SonarQube Cloud, Gitleaks).
- `.github/workflows/release.yml`: tag, release, imagen en Docker Hub, despliegue en test y aprobación para producción.
- `.github/workflows/deploy.yml`: despliegue manual y rollback.
- `.github/dependabot.yml`: actualizaciones automáticas de dependencias.
- `sonar-project.properties`: configuración de SonarQube Cloud.
- `Dockerfile` y `.dockerignore`: la imagen.
- `k8s/`: manifiestos de Kubernetes (sesión 07).
- Web: `eslint.config.mjs` (ESLint para JavaScript) y `.htmlhintrc`. API: `eslint.config.mjs` (ESLint para TypeScript con typescript-eslint), `jest.config.js` y `tsconfig.json`.
- La API usa **TypeScript 6** (`~6.0`): typescript-eslint todavía no funciona con TypeScript 7.

## Antes de la primera pipeline

1. Cambia en `sonar-project.properties` los valores `TU_ORGANIZACION` y `TU_PROJECT_KEY`.
2. Crea en GitHub (**Settings → Secrets and variables → Actions**) lo que usan los workflows:

| Nombre | Tipo | Dónde | Para qué |
| --- | --- | --- | --- |
| `SONAR_TOKEN` | Secreto | **Repository secrets** | SonarQube Cloud |
| `DOCKERHUB_USERNAME` | Variable | Repositorio | Nombre de la imagen |
| `DOCKERHUB_TOKEN` | Secreto | Repository secrets | Subir la imagen |
| `TEST_URL` | Variable | Repositorio | URL de test para OWASP ZAP |
| `RENDER_DEPLOY_HOOK` | Secreto | Entornos `test` y `production` | Desplegar en Render |
| `APP_URL` | Variable | Entornos `test` y `production` | Smoke test |

Los secretos de **entorno** solo llegan a los jobs que llevan `environment:`. Por eso `SONAR_TOKEN` va en el repositorio y `RENDER_DEPLOY_HOOK` en los entornos.

## Probar en local

```bash
# Web
cd web-minimalista
npm ci
npm run lint
npm test

# API
cd api-express
npm ci
npm run lint
npm run typecheck
npm test -- --coverage
```

La web genera `lcov.info` con `npm test`, pero Sonar no cuenta la cobertura todavía (`sonar.coverage.exclusions=**`). La API sí, y Sonar la lee de `coverage/lcov.info`.
