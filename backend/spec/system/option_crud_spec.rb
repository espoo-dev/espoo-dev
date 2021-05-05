require 'rails_helper'

RSpec.describe 'Option CRUD', type: :system do
  include Devise::Test::IntegrationHelpers
  describe 'CRUD' do
    let!(:question) { create(:question) }
    let!(:user) { create(:user) }

    before do
      sign_in user
    end

    describe 'create' do
      let!(:option) { create(:option) }

      it 'creates the option' do
        visit '/admin/options/new'

        find('label', text: 'Question').click
        find('.option', text: question.name).click

        fill_in 'Option type', with: option.option_type

        click_button 'Create Option'
        expect(page).to have_content 'Option was successfully created.'
      end
    end

    describe 'list' do
      it 'list the options' do
        option = create(:option)

        visit '/admin/options'

        expect(page).to have_text(option.option_type)
      end
    end

    describe 'delete' do
      it 'deletes the option' do
        create(:option)

        visit '/admin/options'

        click_on 'Destroy'
        page.accept_alert

        expect(page).to have_text('Option was successfully destroyed.')
      end
    end
  end
end
