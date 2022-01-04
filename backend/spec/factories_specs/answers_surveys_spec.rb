require 'rails_helper'

RSpec.describe 'AnswersSurveysFactory' do
  describe 'answers_survey_with_some_answers' do
    before do
      create(:answers_survey_with_some_answers)
    end

    it { expect(Survey.count).to eq(1) }

    it { expect(Question.count).to eq(2) }
  end
end

