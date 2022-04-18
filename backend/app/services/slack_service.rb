class SlackService < Base
  def initialize(message)
    super()

    @message = message
  end

  def call
    send_message if slack_token.present?
  end

  private

  def send_message
    slack_client.ping @message
  end

  def slack_client
    Slack::Notifier.new(slack_token)
  end

  def slack_token
    ENV['SLACK_TOKEN']
  end
end
