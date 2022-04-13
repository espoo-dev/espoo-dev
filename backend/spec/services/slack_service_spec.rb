require 'rails_helper'

RSpec.describe SlackService do
  describe '#call' do
    subject(:slack_notifier_instance) { instance_double(Slack::Notifier) }

    around do |example|
      slack_token_before = ENV['SLACK_TOKEN']

      ENV['SLACK_TOKEN'] = slack_token_value

      example.run

      ENV['SLACK_TOKEN'] = slack_token_before
    end

    before do
      allow(Slack::Notifier).to(receive(:new).and_return(slack_notifier_instance))

      allow(slack_notifier_instance).to(receive(:ping))

      described_class.call(message)
    end

    context 'when SLACK_TOKEN is settled' do
      let(:slack_token_value) { 'some_beautiful_token' }

      shared_examples 'send the message received as argument Slack::Notifier' do
        it { is_expected.to have_received(:ping).with(message).once }
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

      it { is_expected.not_to have_received(:ping) }
    end
  end
end
