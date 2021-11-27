# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SimpleSurveyPresenter do
  subject(:presenter) { described_class.new(survey, user) }

  let(:survey) { create(:survey_with_answer) }
  let(:last_answers_survey) { survey.last_answers_survey }
  let(:user) { survey.user }

  it { expect(presenter).not_to respond_to(:payload).with(2).arguments }

  it { expect(presenter).to respond_to(:payload).with(0).arguments }

  describe '#payload' do
    it 'matches expected attributes' do
      expected_payload = {
        id: survey.id,
        name: survey.name,
        description: survey.description,
        total_questions_quantity: survey.questions.size,
        answered_questions_quantity: survey.last_answers_quantity
      }
      expect(presenter.payload).to eq expected_payload
    end
  end
end
