
### Requirements
There are two options to setup your local environment, you can install everything mannualy or you can use docker :)
 - Traditional way
   - Ruby 3.0.1
   - PostgreSQL
   - Google Chrome (make sure this browser is installed)
 - Docker
   - docker
   - docker-compose

# Opening a PR (backend)
1. Fork the repo
2. Clone the forked repo
3. Check if the tests are working
  - Traditional way
    - On terminal/console do
      ```bash
      cd espoo-dev/backend
      bundle install
      bundle exec rake db:create db:migrate db:seed
      bundle exec rspec
      ```
  - 🐳 Docker
    - On terminal/console do
      ```bash
      cd espoo-dev
      docker-compose up
      docker-compose exec espoo_server sh
      bundle exec rspec
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
