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

      context 'with single questions' do
        let(:survey) { create(:ready_survey_single_choise_question, user: user_student) }

        before do
          create(:single_choice_ready_question, user: user_student)
          visit surveys_path
        end

        it { expect(page).to have_text('Single choice type of questions.') }
      end

      context 'with multiple questions' do
        before do
          create(:multiple_choice_ready_question, user: user_student)
          visit surveys_path
        end

        it { expect(page).to have_text('Multiple choice type of questions.') }
      end

      context 'with free text questions' do
        let(:survey) { create(:ready_survey_free_text_question, user: user_student) }

        before do
          create(:free_text_ready_question, user: user_student)
          visit surveys_path
        end

        it { expect(page).to have_text('Free text type of questions.') }
      end

      context 'with multiple choise and free text questions' do
        let(:survey) { create(:ready_survey_with_diff_type_of_questions, user: user_student) }

        before do
          visit surveys_path
        end

        it { expect(page).to have_text('Multiple choice, Single choice type of questions.') }
      end
    end
  end
end
