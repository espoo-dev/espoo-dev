# espoo-dev

<p align="center">
  <h3>Frontend CI (semaphore)</h3>
  <a href='https://andersonmalheiro.semaphoreci.com/badges/espoo-dev/branches/master.svg?style=shields'> <img src='https://andersonmalheiro.semaphoreci.com/badges/espoo-dev/branches/main.svg?style=shields' alt='Build Status'></a>
</p>

<p align="center">
  <h3>Backend CI (Ruby.ci)</h3>

  <img src="https://ruby.ci/badges/c9e80d1d-18a0-48f0-a533-541666383998/rspec?cache=false" alt="rspec"/>
  <img src="https://ruby.ci/badges/c9e80d1d-18a0-48f0-a533-541666383998/rubocop?cache=false" alt="rubocop"/>
  <img src="https://ruby.ci/badges/c9e80d1d-18a0-48f0-a533-541666383998/simplecov?cache=false" alt="simplecov"/>
  <img src="https://ruby.ci/badges/c9e80d1d-18a0-48f0-a533-541666383998/brakeman?cache=false" alt="simplecov"/>
  <img src="https://ruby.ci/badges/c9e80d1d-18a0-48f0-a533-541666383998/reek?cache=false" alt="simplecov"/>
</p>

## Project deion
Espoo-dev is a learning platform. There are three user types:
- **Teacher:** Creates `Surveys` with many `Questions`
- **Student:** Answers the `Questions` that belongs to a `Survey`
- **Admin:** (only relevant for developers) Can manage everything

## Architecture / Modules
- This repository is a Monorepo, it has 2 folders named `backend` and `frontend`
- backend (Ruby on Rails):
  - **Backoffice app (admin panel)** : The users (Teacher/Admin) can manage the Surveys, Questions, Options and see the answers/reports
  - **API**: Used by the **Web Client** to enable `Students` to answer `Questions` that belongs to a `Survey`
- frontend (Next, React):
  - **Web Client**: The users (Student) can answer `Questions` that belongs to a `Survey`

## Current features
- **Backoffice app**:
  - Login, Logout
  - Teacher can manage `surveys`, `questions`, `options`
  - Admin manage everything that `Teacher` plus `users`, `roles`, `question types`, `surveys subjects`
- **API**:
  - Login
  - `create`, `index` users
  - `create`, `index` surveys
  - `index` roles
- **Web Client**
  - Login, Logout
  - List surveys

 ## Next features
 - Free text, image, audio, video questions
 - Free text, image, audio, video answers
 - Answers reports
 - Public surveys
 - Surveys protected by password

## How to start the project
- [Docker](http://link_to_docker_readme)
- [Traditional way](http://link_to_traditional_way_readme)

### Requirements (Traditional way)
 - Ruby 3.0.1
 - PostgreSQL
 - Google Chrome (make sure this browser is installed)

# Opening a PR (backend)
1. Fork the repo
2. Clone the forked repo
3. On terminal/console do
    ```bash
    cd espoo-dev/backend
    bundle install
    bundle exec rake db:create db:migrate db:seed
    bundle exec rspec
    ```

## Running the tests

# 🐳 Run
Run project with docker!

```bash
docker-compose up
```

# 🚪 Ports
```sh
# Backend
localhost:3000

#Frontend
localhost:4000
```

# 📝 Docs

1. [Postman requests](https://www.postman.com/grey-zodiac-51715/workspace/espoo/overview)
1. [Class Diagram](https://drive.google.com/file/d/1681YmHrron_fxAb8tOebmzTbqy9qGM8p/view?usp=sharing)


# ✨ Demos
1. [admin](https://espoo.herokuapp.com/)
1. [client](https://espoo-dev.vercel.app/)

# 🌎 Community
1. [Slack](https://join.slack.com/t/espoo-dev/shared_invite/zt-q3od66jm-x7MNmrenB0fra86jop0jsg)



