# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SurveyPresenter do
  subject(:presenter) { described_class.new(survey, user) }

  let!(:user) { create(:user) }
  let!(:answers_survey) { create(:answers_survey_with_some_answers, user: user) }
  let!(:survey) { answers_survey.survey }

  it { expect(presenter).not_to respond_to(:payload).with(2).arguments }

  it { expect(presenter).to respond_to(:payload).with(0).arguments }

  describe '#payload' do
    it 'matches expected attributes when complete' do
      expected_payload = survey_sym(survey, answers_survey)

      expect(presenter.payload).to eq expected_payload
    end
  end
end
