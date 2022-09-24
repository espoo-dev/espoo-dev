class NotificationSlackJob < ApplicationJob
  queue_as :default

  def perform(message:)
    SlackService.call(message)
  end
end
