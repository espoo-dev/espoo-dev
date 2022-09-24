require 'rails_helper'

RSpec.describe NotificationSlackJob, type: :job do
  describe '#perform_later' do
    it 'sends a slack notification' do
      expect do
        described_class.perform_later(message: 'Send a test slack message!')
      end.to enqueue_job
    end
  end

  describe '#perform_later_at_given_time' do
    it 'sends a slack notification at a given time' do
      expect do
        described_class
          .set(wait_until: Date.tomorrow.noon)
          .perform_later(message: 'message')
      end.to have_enqueued_job.with(message: 'message').on_queue('default').at(Date.tomorrow.noon)
    end
  end

  describe '#perform_now' do
    it 'sends a slack notification' do
      ActiveJob::Base.queue_adapter.perform_enqueued_jobs = true
      expect do
        described_class.perform_later(message: 'message')
      end.to have_performed_job.with(message: 'message')
    end
  end

  describe '#call the slack service' do
    before do
      allow(SlackService).to receive(:call)
    end

    it 'executes perform' do
      ActiveJob::Base.queue_adapter.perform_enqueued_jobs = true
      described_class.perform_later(message: 'slack message')
      expect(SlackService).to have_received(:call).with('slack message').once
    end
  end
end
