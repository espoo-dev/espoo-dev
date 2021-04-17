#!/bin/sh
rake db:exists && rake db:migrate || rake db:setup

rm /app/tmp/pids/*

yarn
RAILS_ENV=test bundle exec rails webpacker:compile
RAILS_ENV=test bundle exec rails assets:precompile

# rails s -b 0
sh
