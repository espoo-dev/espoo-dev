redis_host = ENV.fetch('REDIS_HOST', 'localhost')
redis_port = ENV.fetch('REDIS_PORT', '6379')
db_name    = ENV.fetch('REDIS_DB_NAME', '1')
redis_url  = "redis://#{redis_host}:#{redis_port}/#{db_name}"

Sidekiq.configure_server do |config|
  config.redis = { url: redis_url }
end

Sidekiq.configure_client do |config|
  config.redis = { url: redis_url }
end

