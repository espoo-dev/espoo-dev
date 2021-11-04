# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SurveyWithAnsweredQuestionsPresenter do
  subject(:presenter) { described_class.new(survey, user) }

  let(:survey) { create(:survey) }
  let(:user) { survey.user }

  it { expect(presenter).not_to respond_to(:payload).with(2).arguments }

  it { expect(presenter).to respond_to(:payload).with(0).arguments }

  it 'matches expected attributes' do
    expected_payload = {
      name: survey.name,
      description: survey.description,
      id: survey.id,
      answered_questions: AnswersSurvey.by_user_and_survey(user, survey).size
    }
    expect(presenter.payload).to eq expected_payload
  end
end
