require 'rails_helper'

RSpec.describe 'AnswersSurvey', type: :system do
  let!(:user) { create(:user_student) }
  let!(:survey) { create(:survey_with_answer) }
  let(:first_question) { survey.questions.first }

  describe '#create' do
    context 'when valid' do
      before do
        sign_in user
        visit surveys_path
        click_on 'Answer'
      end

      it 'creates answers_survey' do
        expect(AnswersSurvey.find_by(user: user, survey: survey)).to be_present
      end

      it 'redirects to the question page' do
        expect(page).to have_current_path question_path(first_question)
      end
    end

    context 'when not valid' do
      before do
        allow(AnswersSurvey).to receive(:create!).and_raise(StandardError, 'test error')
        sign_in user
        visit surveys_path
        click_on 'Answer'
      end

      it 'redirects to the surveys page' do
        expect(page).to have_current_path surveys_path
      end

      it 'displays the error message' do
        expect(page).to have_content 'test error'
      end
    end
  end
end
