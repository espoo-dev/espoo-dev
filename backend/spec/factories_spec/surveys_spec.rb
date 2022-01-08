require 'rails_helper'

RSpec.describe 'Surveys' do
  describe 'survey_with_2_questions' do
    before do
      create(:survey_with_2_questions)
    end

    it { expect(Survey.count).to eq(1) }

    it { expect(Question.count).to eq(2) }
  end
end
