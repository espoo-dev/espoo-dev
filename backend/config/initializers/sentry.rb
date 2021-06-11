Sentry.init do |config|
    config.dsn = 'https://b9f58db50cc345c6bc2a34ab467d13ac@o828359.ingest.sentry.io/5811570'
    config.breadcrumbs_logger = [:active_support_logger, :http_logger]
  
    # Set tracesSampleRate to 1.0 to capture 100%
    # of transactions for performance monitoring.
    # We recommend adjusting this value in production
    config.traces_sample_rate = 1.0
    # or
    # config.traces_sampler = lambda do |context|
    #   true
    # end
  end