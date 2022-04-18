require 'rails_helper'

RSpec.describe SlackService do
  describe '.call' do
    let(:service) { described_class.new(message) }

    let(:slack_notifier_instance) { instance_double(Slack::Notifier) }

    before do
      allow(slack_notifier_instance).to receive(:ping)

      allow(Slack::Notifier).to receive(:new).and_return(slack_notifier_instance)

      allow(service).to receive(:slack_token).and_return(slack_token_value)

      service.call
    end

    context 'when SLACK_TOKEN is settled' do
      let(:slack_token_value) { 'some_beautiful_token' }

      shared_examples 'send the message received as argument Slack::Notifier' do
        it { expect(slack_notifier_instance).to have_received(:ping).with(message).once }
      end

      it_behaves_like 'send the message received as argument Slack::Notifier' do
        let(:message) { 'A beautiful message to be sent by Slack' }
      end

      it_behaves_like 'send the message received as argument Slack::Notifier' do
        let(:message) { 'Another beautiful message to be sent by Slack' }
      end
    end

    context 'when SLACK_TOKEN is not settled' do
      let(:slack_token_value) { nil }

      let(:message) { 'This beautiful message it will not be sent by Slack' }

      it { expect(slack_notifier_instance).not_to have_received(:ping) }
    end
  end
end
