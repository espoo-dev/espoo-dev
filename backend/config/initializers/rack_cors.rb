Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'
    resource '*',
		headers: :any,
    expose: ['Authorization'],
		methods: [:get, :post, :patch, :put, :options]
  end
end
