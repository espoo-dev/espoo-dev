# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AnswersSurveyPresenter do
  subject(:presenter) { described_class.new(answers_survey) }

  let(:answers_survey) { create(:answers_survey_with_some_answers) }

  it 'matches expected attributes' do
    expected_payload = {
      id: answers_survey.id,
      user_id: answers_survey.user_id,
      status: answers_survey.status
    }
    expect(presenter.payload).to eq expected_payload
  end
end
