require 'rails_helper'

RSpec.describe 'Question CRUD', type: :system do
  include Devise::Test::IntegrationHelpers
  describe 'CRUD' do
    let!(:question_name) { 'question name' }
    let!(:user) { create(:user) }

    before do
      sign_in user
    end

    describe 'create' do
      let!(:question_type) { create(:question_type) }

      it 'creates the question' do
        visit '/admin/questions/new'

        find('label', text: 'Question type').click
        find('.option', text: question_type.name).click

        find('label', text: 'User').click
        find('.option', text: user.email).click

        fill_in 'Name', with: question_name

        click_button 'Create Question'
        expect(page).to have_content 'Question was successfully created.'
      end
    end

    describe 'list' do
      it 'list the questions without id' do
        question = create(:question)

        visit '/admin/questions'

        expect(page).to have_text(question.name)
        expect(page).not_to have_text(question.id)
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
