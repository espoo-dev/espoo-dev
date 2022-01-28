## Code of Conduct

We welcome pull requests from everyone. By participating in this project, you
agree to abide by the [CODE_OF_CONDUCT.md](https://github.com/espoo-dev/espoo-dev/blob/main/CODE_OF_CONDUCT.md)


# ✨ Environments
1. [client-prod](https://espoolingo.herokuapp.com/login)
1. [admin-prod](https://espoo.herokuapp.com/)
1. [admin-staging](https://espoo-staging.herokuapp.com/) - (mobile and web clients should use this for development)
1. default credentials
   - email: admin@gmail.com, password: 123456
   - email: student@gmail.com, password: 123456

## Architecture / Modules

- This repository is a Monorepo, it has 3 folders named `android-client`, `backend` and `frontend`

  - **Client apps** 1 - (Next, React, TS), 2 - (Rails fullstack), 3 - (Android, Kotlin): The `users` (`Student`) can answer `Questions` that belongs to a `Survey`
  - **API - Ruby on Rails**: Used by client apps to enable `Students` to answer `Questions` that belongs to a `Survey`

- **note**: There are 3 clients: React, Android and Rails.
## Getting started / Setup

1. [frontend_readme.md](https://github.com/espoo-dev/espoo-dev/blob/main/frontend/README.md)

1. [backend_readme.md](https://github.com/espoo-dev/espoo-dev/blob/main/backend/README.md)

## Opening a PR
1. Fork the repo
2. Clone the forked repo
3. Check if the tests are working
4. Create a Pull Request

# 📝 Docs (requests)

1. [Swagger](https://espoo-staging.herokuapp.com/api-docs/index.html)
