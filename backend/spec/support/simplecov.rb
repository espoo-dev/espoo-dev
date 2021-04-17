require 'simplecov'
SimpleCov.minimum_coverage_by_file 100

SimpleCov.start do
  add_filter 'spec'
  add_filter 'config'
  add_filter 'db'
  add_filter 'node_modules'
  add_group 'Controllers', '/app/controllers'
  add_group 'Models', '/app/models'
  add_group 'Helpers', '/app/helpers'
  track_files '/app/**/*.rb'
end
