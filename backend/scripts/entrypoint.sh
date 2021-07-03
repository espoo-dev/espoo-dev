#!/bin/sh
bundle install

#config env to not need to use bundle exec before commands
mkdir -p .git/safe
ENV PATH=".git/safe/../../bin:$PATH"
export PATH=".git/safe/../../bin:$PATH"

rake db:exists && rake db:migrate || rake db:setup

rm /app/tmp/pids/*

yarn
RAILS_ENV=test rails webpacker:compile
RAILS_ENV=test rails assets:precompile

rails s -b 0
# sh
