# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Seeds do
  describe '#call' do
    before { described_class.call }

    it 'creates 3 users' do
      expect(User.count).to eq(3)
    end

    it 'creates 3 roles' do
      expect(Role.count).to eq(3)
    end

    it 'creates 3 question types' do
      expect(QuestionType.count).to eq(3)
    end

    it 'creates 2 survey subjects' do
      expect(SurveySubject.count).to eq(2)
    end

    it 'creates 6 questions' do
      expect(Question.count).to eq(6)
    end
  end
end
