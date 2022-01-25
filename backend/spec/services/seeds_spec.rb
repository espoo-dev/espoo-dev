# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Seeds do
  describe '#call' do
    describe 'when non production environment' do
      before { described_class.call }

      it 'creates 3 users' do
        expect(User.count).to eq(3)
      end

      it 'creates 3 roles' do
        expect(Role.count).to eq(3)
      end

      it 'creates 2 question types' do
        expect(QuestionType.count).to eq(2)
      end

      it 'creates 3 survey subjects' do
        expect(SurveySubject.count).to eq(3)
      end

      it 'creates 12 questions' do
        expect(Question.count).to eq(12)
      end

      it 'creates 41 options' do
        expect(Option.count).to eq(41)
      end
    end

    describe 'when production environment' do
      before do
        allow(Rails.env).to receive(:production?).and_return(true)
        described_class.call
      end

      it 'do not create entities' do
        expect(User.count).to be_zero
      end
    end
  end
end
