require 'rails_helper'

RSpec.describe 'SurveysFactory' do
  describe 'survey_with_answer' do
    before do
      create(:survey_with_answer)
    end

    it { expect(Survey.count).to eq(1) }

    it { expect(Question.count).to eq(2) }
  end

  describe 'survey_with_2_questions' do
    before do
      create(:survey_with_2_questions)
    end

    it { expect(Survey.count).to eq(1) }

    it { expect(Question.count).to eq(2) }
  end
end

