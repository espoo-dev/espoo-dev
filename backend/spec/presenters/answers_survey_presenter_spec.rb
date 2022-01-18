# frozen_string_literal: true

require 'rails_helper'

RSpec.describe AnswersSurveyPresenter do
  subject(:presenter) { described_class.new(answers_survey) }

  let!(:user) { create(:user) }
  let!(:answers_survey) { create(:answers_survey_with_some_answers, user: user) }

  it 'matches expected attributes' do
    expected_payload = answers_survey_sym(answers_survey)
    expect(presenter.payload).to eq expected_payload
  end
end
