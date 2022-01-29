# Espoo-dev

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

## ✨ Demo

1. [espoolingo](https://espoolingo.herokuapp.com/login)
1. credentials
   - email: admin@gmail.com, password: 123456
   - email: student@gmail.com, password: 123456

## Project definion

Espoo-dev is a learning platform. There are three roles:

- **Teacher:** Creates `Surveys` with many `Questions`
- **Student:** Answers the `Questions` that belongs to a `Survey`
- **Admin:** (only relevant for developers) Can manage everything

## :smiley: Contributing

1. [Slack](https://join.slack.com/t/espoo-dev/shared_invite/zt-q3od66jm-x7MNmrenB0fra86jop0jsg)

1. [CONTRIBUTING.md](https://github.com/espoo-dev/espoo-dev/blob/main/CONTRIBUTING.md)

## Current features

|                       | Login              | Register                 | Logout                   | List surveys       | Select survey            | Answer questions         | Show survey summary      |
| --------------------- | ------------------ | ------------------------ | ------------------------ | ------------------ | ------------------------ | ------------------------ | ------------------------ |
| Web (React, TS, Next) | :heavy_check_mark: | :heavy_check_mark:       | :heavy_check_mark:       | :heavy_check_mark: | :heavy_check_mark:       | :heavy_check_mark:       | :heavy_check_mark:       |
| Mobile (Kotlin)       | :heavy_check_mark: | :heavy_multiplication_x: | :heavy_multiplication_x: | :heavy_check_mark: | :heavy_multiplication_x: | :heavy_multiplication_x: | :heavy_multiplication_x: |
| Fullstack (Rails)     | :heavy_check_mark: | :heavy_check_mark:       | :heavy_multiplication_x: | :heavy_check_mark: | :heavy_multiplication_x: | :heavy_multiplication_x: | :heavy_multiplication_x: |
| API (Rails)           | :heavy_check_mark: | :heavy_check_mark:       | :heavy_check_mark:       | :heavy_check_mark: | :heavy_check_mark:       | :heavy_check_mark:       | :heavy_check_mark:       |
