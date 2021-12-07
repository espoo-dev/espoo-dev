require 'rails_helper'

RSpec.describe 'Question', type: :system do
  let!(:user) { create(:user_student) }
  let!(:question) { create(:multiple_choice_question) }

  describe '#show' do
    before do
      sign_in user
      visit question_path question
    end

    it 'displays the name of the question' do
      expect(page).to have_content question.name
    end

    it 'displays the options of the question' do
      question.options.each do |option|
        expect(page).to have_content option.name
      end
    end

    it 'displays the question type of the question' do
      expect(page).to have_content 'This is a multiple choice question.'
    end
  end
end
