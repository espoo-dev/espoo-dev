require 'rails_helper'

RSpec.describe 'Creates AnswerSurvey', type: :system do
  context 'when logged user is at surveys page and click on "answer" button' do
    let(:user_student) { create(:user_student) }
    let!(:survey) { create(:ready_survey) }

    before do
      sign_in user_student
      visit surveys_path
      click_button('Answer')
    end

    it 'creates AnswerSurvey by user' do
      expect(AnswersSurvey.first.user).to eq(user_student)
    end

    it 'creates AnswerSurvey by survey' do
      expect(AnswersSurvey.first.survey).to eq(survey)
    end
  end
end
