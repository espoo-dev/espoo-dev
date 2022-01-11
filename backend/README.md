# README

# 🐳 Run (with docker)

- `docker-compose up espoo_server`

- `docker-compose exec espoo_server validate_all.sh`

- navigate to http://localhost:3000

- username: `admin@gmail.com` password: `123456`

# :heart: Run (standalone)

- `cd backend`
- `bundle install`
- `bundle exec rake db:create db:migrate db:seed`
- `export RAILS_MASTER_KEY: 'a667717bf0a47475b0582547379c816d'`
- `export DEVISE_JWT_SECRET_KEY: 'e26a21cfca4fdf67cc4e82385ba2d6ea4fb83ad1f8f5'`
- `bundle exec rspec`
- `bundle exec rails s -b 0`

In case you have problems with the Selenium Chrome driver using ubuntu, when trying to run the tests:

Run:

- `sudo apt update `
- `sudo apt install -y unzip xvfb libxi6 libgconf-2-4`
- `sudo apt install default-jdk`
- `sudo curl -sS -o - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add`
- `sudo bash -c "echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' >> /etc/apt/sources.list.d/google-chrome.list"`
- `sudo apt -y update`
- `sudo apt -y install google-chrome-stable`
- `google-chrome –version`

Output example =>

<p style='color:red'>97.0.4692.71</p>

Replace the version in the next command with yours:

- `wget https://chromedriver.storage.googleapis.com/97.0.4692.71/chromedriver_linux64.zip`

- `unzip chromedriver_linux64.zip`
- `sudo mv chromedriver /usr/bin/chromedriver`
- `sudo chown root:root /usr/bin/chromedriver`
- `sudo chmod +x /usr/bin/chromedriver`

# Reference projects

1. [Chatwoot](https://www.chatwoot.com/)
   - [Repository](https://github.com/chatwoot/chatwoot)
1. [Dev.to](https://dev.to/)
   - [Repositiory](https://github.com/forem/forem)
1. [Gitlab](https://about.gitlab.com/)
   - [Repository](https://github.com/gitlabhq/gitlabhq)

- **Note**: If you find some project that can be used as reference, you can add it.
