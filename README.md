# DockerLab — Containerized Task Management System

![Docker](https://img.shields.io/badge/Docker-Learning_Project-2496ED?logo=docker&logoColor=white) ![Status](https://img.shields.io/badge/Status-In_Progress-yellow) ![Progress](https://img.shields.io/badge/Progress-Day_2_of_21-blue)

A hands-on, 21-day Docker learning project built around a deliberately simple task management application. The objective is to master containerization, image builds, networking, storage, Docker Compose, security, debugging, registries, CI/CD, and deployment through practical exercises.

> **Current status:** Day 2 — Dockerfiles, image layers, build caching, build context, and `.dockerignore`. Later features described below are planned, not yet implemented.

## Project goals

- Build, run, inspect, troubleshoot, and optimize Docker images and containers.
- Run a simple full-stack application using separate frontend, backend, database, and reverse-proxy containers.
- Understand persistence, container networking, security, and resource controls.
- Publish versioned images and automate testing and image builds.
- Deploy and operate the application on a Linux VM.

## Planned application features

- Create, list, update, and delete tasks.
- Track task status (`pending`, `in_progress`, `completed`).
- Expose a backend health endpoint.

## Technology stack

| Component | Technology | Status |
| --- | --- | --- |
| Backend | Node.js 24, Express | Day 1 basic health endpoint |
| Frontend | React | Planned |
| Database | PostgreSQL | Planned |
| Reverse proxy | Nginx | Planned |
| Container runtime and orchestration | Docker Engine, Docker Compose | In progress |
| CI | GitHub Actions | Planned |

## Planned architecture

```text
Browser :8080
    |
    v
Nginx reverse proxy
    |                 \
    v                  v
React frontend     Node.js API
                        |
                        v
                  PostgreSQL
                  (named volume)
```

The final system will use Docker Compose networking. Only the required entrypoint will be published to the host in the production-style configuration.

## Current project structure

```text
dockerlab-task-manager/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── package-lock.json
│   ├── Dockerfile
│   ├── Dockerfile.bad       # Day 2 cache experiment (optional)
│   └── .dockerignore
├── .gitignore
└── README.md
```

Additional frontend, database, Nginx, Compose, CI, and scripts directories will be introduced as the project progresses.

## Prerequisites

- Linux or another Docker-supported operating system
- Docker Engine with BuildKit support
- Node.js and npm for local development
- Git

Verify:

```bash
docker --version
docker info
node --version
npm --version
git --version
```

## Run the current backend locally

From the repository root:

```bash
cd backend
npm ci
node server.js
```

In another terminal:

```bash
curl http://localhost:3000/health
```

Expected basic response (Day 1):

```json
{"status":"healthy","service":"dockerlab-backend"}
```

## Build and run the current Docker image

From the repository root:

```bash
cd backend
docker build -t dockerlab-api:v1 .
docker run -d --name dockerlab-api -p 3001:3000 dockerlab-api:v1
curl http://localhost:3001/health
```

Inspect and clean up:

```bash
docker ps
docker logs dockerlab-api
docker image ls
docker history dockerlab-api:v1
docker rm -f dockerlab-api
```

## Day 2: Image layers and caching

The optimized beginner Dockerfile copies package manifests before application code so changing `server.js` does not force a dependency reinstall:

```dockerfile
FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY server.js ./
EXPOSE 3000
CMD ["node", "server.js"]
```

Build and inspect:

```bash
cd backend
docker build --progress=plain -t dockerlab-api:v1 .
docker history dockerlab-api:v1
docker image inspect dockerlab-api:v1
```

After updating `server.js` with a version field, rebuild as `dockerlab-api:v2`. Compare cached steps with a `Dockerfile.bad` that runs `COPY . .` before `npm ci`.

### Day 2 observations

Fill this in after running the exercises:

| Experiment | Observation |
| --- | --- |
| First image build | TODO |
| Repeated build | TODO |
| Build after changing `server.js` | TODO |
| Bad Dockerfile after source change | TODO |
| Build context before/after `.dockerignore` | TODO |
| Image size comparison | TODO |

## 21-day roadmap

| Day | Focus | Status |
| --- | --- | --- |
| 1 | Docker architecture, images, containers, lifecycle | Completed / verify |
| 2 | Dockerfile, layers, build cache, build context | In progress |
| 3 | Ports, environment variables, logs, exec, inspect | Planned |
| 4 | Bind mounts, volumes, backup and restore | Planned |
| 5 | Networks, DNS, container communication | Planned |
| 6 | Docker Compose, dependencies, healthchecks | Planned |
| 7 | React frontend container | Planned |
| 8 | Nginx reverse proxy | Planned |
| 9 | Multi-stage builds and image optimization | Planned |
| 10 | BuildKit, build arguments, cache, build secrets | Planned |
| 11 | Non-root users, secrets, image scanning | Planned |
| 12 | Resource limits, restart policies, graceful shutdown | Planned |
| 13 | Debugging, logs, stats, events, cleanup | Planned |
| 14 | Registries, tags, digests, push and pull | Planned |
| 15 | GitHub Actions Docker CI | Planned |
| 16 | Linux VM deployment | Planned |
| 17 | Updates, rollback, backup and recovery | Planned |
| 18 | Multi-platform builds | Planned |
| 19 | Compose profiles and overrides | Planned |
| 20 | Rootless Docker and daemon security | Planned |
| 21 | Failure simulation, documentation and assessment | Planned |

## Git workflow

```bash
git add .
git commit -m "docs: document DockerLab day 2 progress"
git push
```

Update the roadmap status, experiment observations, and architecture as each day's tasks are completed. Never commit `.env`, credentials, database data, or local dependencies.

## License

Educational project. Add a license file if you decide to publish under an open-source license.
