redis_keys = Rails.application.credentials.redis
redis_host = ENV.fetch('REDIS_HOST', redis_keys[:redis_host])
redis_port = ENV.fetch('REDIS_PORT', redis_keys[:redis_port])
db_name    = ENV.fetch('REDIS_DB_NAME', redis_keys[:db_name])
redis_url  = "redis://#{redis_host}:#{redis_port}/#{db_name}"

Sidekiq.configure_server do |config|
  config.redis = { url: redis_url }
end

Sidekiq.configure_client do |config|
  config.redis = { url: redis_url }
end