require 'rails_helper'

RSpec.describe NotificationSlackJob, type: :job do
  describe '#perform_later' do
    it 'sends a slack notification' do
      expect do
        described_class.perform_later('Send a test slack message!')
      end.to enqueue_job
    end
  end

  describe '#perform_later_at_given_time' do
    it 'sends a slack notification at a given time' do
      expect do
        described_class
          .set(wait_until: Date.tomorrow.noon)
          .perform_later('message')
      end.to have_enqueued_job.with('message').on_queue('default').at(Date.tomorrow.noon)
    end
  end
end
