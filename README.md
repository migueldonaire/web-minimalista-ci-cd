# Web Minimalista

Web estática (HTML, CSS y JavaScript) con todas las pipelines del curso aplicadas: sesiones 01 a 04, 06 y 07.

## En local

```bash
npm test          # tests con node:test
npm run lint      # revisar el HTML con HTMLHint
docker compose up --build   # la web en http://localhost:8080
```

## Pipelines

| Fichero | Cuándo | Qué hace |
| --- | --- | --- |
| `.github/workflows/ci.yml` | PR contra `main` y push a `main` | Lint, tests, aviso de versión, build de la imagen, Trivy, SonarQube Cloud y Gitleaks |
| `.github/workflows/release.yml` | Push a `main` | Release si la versión de `package.json` es nueva → imagen en Docker Hub → test → ZAP → aprobación → producción |
| `.github/workflows/deploy.yml` | A mano o desde `release.yml` | Despliega una versión en un entorno de Render y comprueba `/version.txt` |
| `.github/dependabot.yml` | Cada semana | PRs para actualizar dependencias, actions e imagen base |

Para sacar una versión nueva, sube `version` en `package.json` dentro de tu PR (`npm version minor --no-git-tag-version`).

# CAMBIO