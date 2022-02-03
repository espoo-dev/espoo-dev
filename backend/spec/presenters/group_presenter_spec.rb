# frozen_string_literal: true

require 'rails_helper'

RSpec.describe GroupPresenter do
  subject(:presenter) { described_class.new(group, user) }

  let!(:group) { create(:group_with_1_survey) }
  let!(:user) { group.surveys.first.answers_surveys.first.user }
  let!(:survey) { group.surveys.first }

  describe '#payload' do
    it 'matches expected attributes' do
      survey_payload = SurveyPresenter.new(survey, user).payload
      expected_payload = {
        "id" => group.id,
        "name" => group.name,
        "surveys" => [survey_payload]
      }.with_indifferent_access

      expect(presenter.payload.with_indifferent_access).to eq expected_payload
    end
  end
end
