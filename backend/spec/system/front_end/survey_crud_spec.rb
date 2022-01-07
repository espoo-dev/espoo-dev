require 'rails_helper'

RSpec.describe 'Survey CRUD', type: :system do
  describe 'CRUD' do
    let!(:user_student) { create(:user_student) }
    let!(:survey) { create(:survey_with_answer, user: user_student) }

    describe '#index' do
      before do
        sign_in user_student
        visit surveys_path
      end

      it { expect(page).to have_text(survey.name) }

      context 'with one question' do
        it { expect(page).to have_text('1 question answered') }
      end

      context 'with multiple answered questions' do
        before do
          create(:survey_with_two_answers, user: user_student)
          visit surveys_path
        end

        it { expect(page).to have_text('2 questions answered') }
      end
    end
  end
end
