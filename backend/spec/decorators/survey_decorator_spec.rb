require 'rails_helper'

RSpec.describe SurveyDecorator do
  describe '#title' do
    it 'has singular name when survey has only one question' do
      survey = create(:survey)
      title = "#{survey.name} (1 Question)"
      expect(survey.decorate.title).to eq title
    end

    it 'has plural name when survey has only one question' do
      survey = create(:survey_with_2_questions)
      title = "#{survey.name} (2 Questions)"
      expect(survey.decorate.title).to eq title
    end
  end
end
