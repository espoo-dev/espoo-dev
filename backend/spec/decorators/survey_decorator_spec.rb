require 'rails_helper'

RSpec.describe SurveyDecorator do
  describe '#title' do
    context 'when survey has only one question' do
      it 'has singular name' do
        survey = create(:survey_with_1_question)
        title = "#{survey.name} (1 Question)"
        expect(survey.decorate.title).to eq title
      end

      it 'has plural name' do
        survey = create(:survey_with_2_questions)
        title = "#{survey.name} (2 Questions)"
        expect(survey.decorate.title).to eq title
      end
    end
  end
end
