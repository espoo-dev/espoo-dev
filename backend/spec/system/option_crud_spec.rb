require 'rails_helper'

RSpec.describe 'Option CRUD', type: :system do
  include Devise::Test::IntegrationHelpers
  describe 'CRUD' do
    let!(:question) { create(:question) }
    let!(:user) { create(:user) }
    let!(:option) { create(:option) }

    before do
      sign_in user
    end

    describe 'create' do
      context 'when data is valid' do
        before do
          visit new_admin_option_path

          find('label', text: 'User').click
          find('.option', text: user.email).click
          find('label', text: 'Question').click
          find('.option', text: question.name).click
          find('label', text: 'Correct').click
          fill_in 'Name', with: option.name

          click_button 'Create Option'
        end

        it { expect(page).to have_content 'Option was successfully created.' }
      end

      context 'when data is not valid' do
        before do
          option_two = create(:option, question: question)
          visit new_admin_option_path

          find('label', text: 'User').click
          find('.option', text: user.email).click
          find('label', text: 'Question').click
          find('.option', text: question.name).click
          find('label', text: 'Correct').click
          fill_in 'Name', with: option_two.name

          click_button 'Create Option'
        end

        it { expect(page).to have_content 'Name has already been taken' }
      end
    end

    describe 'update' do
      before do
        visit edit_admin_option_path(option)
        find('label', text: 'Correct').click
        click_button 'Update Option'
      end

      it { expect(page).to have_content('true') }
    end

    describe 'list' do
      before do
        visit admin_options_path
      end

      it { expect(page).to have_text(option.name) }
    end

    describe 'delete' do
      before do
        visit admin_options_path

        click_on 'Destroy'
        page.accept_alert
      end

      it { expect(page).to have_text('Option was successfully destroyed.') }
    end
  end
end
