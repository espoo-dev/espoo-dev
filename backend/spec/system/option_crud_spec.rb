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
      it 'creates the option' do
        visit new_admin_option_path

        find('label', text: 'User').click
        find('.option', text: user.email).click
        find('label', text: 'Question').click
        find('.option', text: question.name).click
        find('label', text: 'Correct').click
        fill_in 'Name', with: option.name

        click_button 'Create Option'
        expect(page).to have_content 'Option was successfully created.'
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
      it 'list the options' do
        option = create(:option)

        visit admin_options_path

        expect(page).to have_text(option.name)
      end
    end

    describe 'delete' do
      it 'deletes the option' do
        visit admin_options_path

        click_on 'Destroy'
        page.accept_alert

        expect(page).to have_text('Option was successfully destroyed.')
      end
    end
  end
end
