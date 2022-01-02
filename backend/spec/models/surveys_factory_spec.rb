require 'rails_helper'

RSpec.describe 'SurveysFactory' do
  let!(:survey) { create(:survey_with_answer) }

  it { expect(Survey.count).to eq(1) }

  it { expect(Question.count).to eq(2) }
end
