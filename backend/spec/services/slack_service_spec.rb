require 'rails_helper'

RSpec.describe SlackService do
  describe '#call' do
    subject(:slack_notifier_instance) { instance_double(Slack::Notifier) }

    before do
      allow(Slack::Notifier).to(receive(:new).and_return(slack_notifier_instance))

      allow(slack_notifier_instance).to(receive(:ping))

      SlackService.call(message)
    end

    shared_examples 'sent the message received to Slack::Notifier' do
      it { is_expected.to have_received(:ping).with(message).once }
    end

    it_behaves_like 'sent the message received to Slack::Notifier' do
      let(:message) { 'A beautiful message to be sent by Slack' }
    end

    it_behaves_like 'sent the message received to Slack::Notifier' do
      let(:message) { 'Another beautiful message to be sent by Slack' }
    end
  end
end
