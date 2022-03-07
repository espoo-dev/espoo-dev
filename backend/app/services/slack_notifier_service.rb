class SlackNotifierService < Base
  def initialize(message)
    return if ENV['SLACK_TOKEN'].blank?
      
    @slack_client = Slack::Notifier.new ENV['SLACK_TOKEN']

    @message = message
  end

  def call
    return unless Rails.env.production?
    
    return unless @slack_client

    @slack_client.ping @message
  end
end