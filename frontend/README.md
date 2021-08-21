## Getting Started

# 🐳 Run (with docker)

- `cp frontend/.env.docker.example frontend/.env.local` (This way you access backend docker service)
- `docker-compose up`
- Access http://localhost:4000
- [credentials](https://github.com/espoo-dev/espoo-dev/blob/main/backend/README.md)

# :heart: Run (standalone)

- `cd frontend`
- `yarn`
- `yarn dev`
- `cp .env.native.example .env.local` (This way you will not need to configure local backend, instead will use heroku server)
- Access [http://localhost:4000](http://localhost:4000)
- [credentials](https://github.com/espoo-dev/espoo-dev/blob/main/backend/README.md)

