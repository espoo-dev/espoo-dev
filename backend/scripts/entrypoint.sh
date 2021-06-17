#!/bin/sh
bundle install

rake db:exists && rake db:migrate || rake db:setup

rm /app/tmp/pids/*

yarn
RAILS_ENV=test rails webpacker:compile
RAILS_ENV=test rails assets:precompile

rails s -b 0
# sh
