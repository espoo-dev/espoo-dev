require 'rails_helper'

RSpec.describe 'Question CRUD', type: :system do
  include Devise::Test::IntegrationHelpers
  describe 'CRUD' do
    let!(:question_name) { 'question name' }

    before do
      sign_in create(:user)
    end

    describe 'create' do
      let!(:question_type) { create(:question_type) }

      it 'creates the question' do
        visit '/admin/questions/new'

        find('label', text: 'Question type').click
        find('.option', text: question_type.name).click
        fill_in 'Name', with: question_name

        click_button 'Create Question'
        expect(page).to have_content 'Question was successfully created.'
      end
    end

    describe 'list' do
      it 'list the questions' do
        question = create(:question)

        visit '/admin/questions'

        expect(page).to have_text(question.name)
      end
    end

    describe 'delete' do
      it 'deletes the question' do
        create(:question)

        visit '/admin/questions'

        click_on 'Destroy'
        page.accept_alert

        expect(page).to have_text('Question was successfully destroyed.')
      end
    end
  end
end
