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

## Project description
Espoo-dev is a learning platform. There are three user types:
- **Teacher:** Creates `Surveys` with many `Questions`
- **Student:** Answers the `Questions` that belongs to a `Survey`
- **Admin:** (only relevant for developers): Can manage everything

## Architecture / Modules
- This repository is a Monorrepo, it has 2 folders named `backend` and `frontend`
- backend (Ruby on Rails):
  - **Backoffice app**: The users (Teacher/Admin) can manage the Surveys, Questions, Options and see the answers/reports
  - **API**: Used by the **Web Client** to enable `Students` to answer `Questions` that belongs to a `Survey`
- frontend (Next, React):
  - **Web Client**: The users (Student) can answer `Questions` that belongs to a `Survey`

## Current features
- **Backoffice app**:
  - Login, Logout
  - Manage `users`, `roles`, `suerveys`, `questions`,  `question types`, `options`
- **API**:
  - Login
  - `create`, `index` users
  - `create`, `index` surveys
  - `index` roles
- **Web Client**
  - Login, Logout
  - List surveys

 ## Next features
 - Free text, image, audio, video questions and answers
 - Answers reports
 - Public surveys
 - Surveys protected by password

## How to start the project

To run this project you must have a computer, preferably Linux, with the Ruby programming language version 3.0.1.

On your computer terminal,
clone the project: ```$ https://github.com/espoo-dev/espoo-dev.git```.
Go to the folder, open the project and install the dependencies by running ‘Bundle’.

## Running the tests

With all dependencies installed, as described in the previous section,
Our test tool uses ***Google Chrome***, make sure this browser is installed on your computer and on your terminal run `rspec`, the list of features and tests are in the folder `\spec`.
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




