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
      before do
        visit new_admin_option_path

        find('label', text: 'User').click
        find('.option', text: user.email).click
        find('label', text: 'Question').click
        find('.option', text: question.name).click

        fill_in 'Name', with: option.name

        click_button 'Create Option'
      end

      it { expect(page).to have_content 'Option was successfully created.' }
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
