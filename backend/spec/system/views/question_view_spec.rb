require 'rails_helper'

RSpec.describe 'Questions Views', type: :system do
  include Devise::Test::IntegrationHelpers

  let!(:student) { create(:user_student) }
  let!(:survey) { create(:survey_with_2_questions) }
  let(:question) { survey.questions.first }
  let(:user) { question.user }

  describe '#show' do
    before do
      2.times { |i| Option.create(question: question, name: "option#{i + 1}", user: user) }
      sign_in student
      visit surveys_path
      click_on 'Answer'
    end

    it 'displays the question name' do
      expect(page).to have_content question.name
    end

    it 'displays the options of the question' do
      expect(page).to have_content 'option1'
      expect(page).to have_content 'option2'
    end
  end
end
