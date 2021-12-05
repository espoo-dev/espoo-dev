# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SurveyPresenter do
  subject(:presenter) { described_class.new(survey, user) }

  let(:survey) { create(:survey_with_answer) }
  let(:last_answers_survey) { survey.last_answers_survey }
  let(:user) { survey.user }

  it { expect(presenter).not_to respond_to(:payload).with(2).arguments }

  it { expect(presenter).to respond_to(:payload).with(0).arguments }

  describe '#payload' do
    it 'matches expected attributes when complete' do
      answers_survey_payload = {
        id: last_answers_survey.id,
        status: last_answers_survey.status,
        user_id: last_answers_survey.user_id
      }
      expected_payload = {
        id: survey.id,
        name: survey.name,
        description: survey.description,
        total_questions_quantity: survey.questions.count,
        answered_questions_quantity: survey.last_answers_quantity,
        answers_surveys: [answers_survey_payload],
        last_answers_survey: answers_survey_payload
      }
      expect(presenter.payload).to eq expected_payload
    end
  end
end
