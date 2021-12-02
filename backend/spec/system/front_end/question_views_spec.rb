require 'rails_helper'

RSpec.describe 'Question CRUD', type: :system do
  include Devise::Test::IntegrationHelpers
  describe 'CRUD' do
    let!(:user) { create(:user_student) }
    let!(:survey) { create(:survey_with_answer) }
    let(:first_question) { survey.questions.first }

    describe '#show' do
      before do
        sign_in user
        visit surveys_path
        click_on 'Answer'
      end

      it 'displays the name of the first question' do
        expect(page).to have_content first_question.name
      end

      it 'displays the options of the question' do
        first_question.options.each do |option|
          expect(page).to have_content option.name
        end
      end

      it 'displays the question type of the question' do
        expect(page).to have_content 'This is a multiple choice question.'
      end
    end
  end
end
