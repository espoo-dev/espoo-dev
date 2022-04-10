class SlackService < Base
  def initialize(message)
    @slack_client = Slack::Notifier.new(ENV['SLACK_TOKEN'])

    @message = message
  end

  def call
    @slack_client.ping @message
  end
end
