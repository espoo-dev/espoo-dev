# espoo-dev

<p align="center">
  <h3>Frontend CI (semaphore)</h3>
  <a href='https://andersonmalheiro.semaphoreci.com/badges/espoo-dev/branches/main.svg'> <img src='https://andersonmalheiro.semaphoreci.com/badges/espoo-dev/branches/main.svg' alt='Build Status'></a>
  <a href="https://codeclimate.com/github/espoo-dev/espoo-dev/maintainability"><img src="https://api.codeclimate.com/v1/badges/9979316a0c088a5cf937/maintainability" /></a>
  <a href="https://codeclimate.com/github/espoo-dev/espoo-dev/test_coverage"><img src="https://api.codeclimate.com/v1/badges/9979316a0c088a5cf937/test_coverage" /></a>
</p>

<p align="center">
  <h3>Backend CI (Ruby.ci)</h3>

  <img src="https://ruby.ci/badges/c9e80d1d-18a0-48f0-a533-541666383998/rspec?cache=false" alt="rspec"/>
  <img src="https://ruby.ci/badges/c9e80d1d-18a0-48f0-a533-541666383998/rubocop?cache=false" alt="rubocop"/>
  <img src="https://ruby.ci/badges/c9e80d1d-18a0-48f0-a533-541666383998/simplecov?cache=false" alt="simplecov"/>
  <img src="https://ruby.ci/badges/c9e80d1d-18a0-48f0-a533-541666383998/brakeman?cache=false" alt="simplecov"/>
  <img src="https://ruby.ci/badges/c9e80d1d-18a0-48f0-a533-541666383998/reek?cache=false" alt="simplecov"/>
</p>

## Project definion

Espoo-dev is a learning platform. There are three user types:

- **Teacher:** Creates `Surveys` with many `Questions`
- **Student:** Answers the `Questions` that belongs to a `Survey`
- **Admin:** (only relevant for developers) Can manage everything

## Architecture / Modules

- This repository is a Monorepo, it has 2 folders named `backend` and `frontend`
- backend (Ruby on Rails):
  - **Backoffice app (admin panel)** : The users (Teacher/Admin) can manage the Surveys, Questions, Options and see the answers/reports
  - **API**: Used by the **Web Client** to enable `Students` to answer `Questions` that belongs to a `Survey`
  - **Web Client**: The users (Student) can answer `Questions` that belongs to a `Survey`
- frontend (Next, React):
  - **Web Client**: The users (Student) can answer `Questions` that belongs to a `Survey`
- Mobile (Android, Kotlin):
  - **Mobile Client**: The users (Student) can answer `Questions` that belongs to a `Survey`
- **note**: We have 2 versions of Web Client, Next/React and Rails

## :smiley: Contributing

Please check [CONTRIBUTING.md](https://github.com/espoo-dev/espoo-dev/blob/main/CONTRIBUTING.md)

# ✨ Demos

1. [admin](https://espoo.herokuapp.com/)
1. [client](https://espoolingo.herokuapp.com/)
1. credentials
   - email: admin@gmail.com, password: 123456
   - email: student@gmail.com, password: 123456

# 🌎 Community

1. [Slack](https://join.slack.com/t/espoo-dev/shared_invite/zt-q3od66jm-x7MNmrenB0fra86jop0jsg)

## Current features

- **API**:
  - Login
  - `create`, `index` users
  - `create`, `index` surveys
  - `index` roles
- **Backoffice app - rails**:
  - Login, Logout
  - Teacher can manage `surveys`, `questions`, `options`
  - Admin manage everything that `Teacher` plus `users`, `roles`, `question types`, `surveys subjects`
- **Web Client - react**
  - Login, Logout, Register
  - List surveys
- **Web Client - rails**
  - Login, Logout, Register
  - List surveys

## Next features

- Free text, image, audio, video questions
- Free text, image, audio, video answers
- Answers reports
- Public surveys
- Surveys protected by password
