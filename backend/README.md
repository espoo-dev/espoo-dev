# README


# 🐳 Run (with docker)

- `docker-compose up`

- `docker-compose exec espoo_server bundle exec rspec`

- navigate to http://localhost:3000

- username: `admin@gamil.com` password: `123456`

# :heart: Run (standalone)

- `bundle install`
- `bundle exec rake db:create db:migrate db:seed`
- `bundle exec rspec` (need environment variables from `docker-compose.yml`)
- `bundle exec rails s -b 0` (need environment variables from `docker-compose.yml`)
