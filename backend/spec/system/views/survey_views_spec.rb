require 'rails_helper'

RSpec.describe 'Survey CRUD', type: :system do
  include Devise::Test::IntegrationHelpers
  describe 'CRUD' do
    let!(:user) { create(:user_student) }
    let!(:survey) { create(:survey_with_answer) }
    let(:answered_questions_count) { AnswersSurvey.where(user: user, survey: survey).size }

    describe '#show' do
      before do
        sign_in user
        visit survey_path(survey)
      end

      it 'displays the surveys name' do
        expect(page).to have_content survey.name
      end

      it 'displays the surveys description' do
        expect(page).to have_content survey.description
      end

      it 'displays the answered questions quantity' do
        expect(page).to have_content "Total answered questions: #{answered_questions_count}"
      end
    end
  end
end
