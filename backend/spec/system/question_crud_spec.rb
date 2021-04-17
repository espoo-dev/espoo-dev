require 'rails_helper'

RSpec.describe 'Question CRUD', type: :system do
  include Devise::Test::IntegrationHelpers
  describe 'CRUD' do
    let!(:question) { create(:question) }
    let(:question_type) { create(:question_type) }

    before do
      sign_in create(:user)
    end

    it 'list question' do
      visit '/admin/questions/'

      expect(page).to have_text(question.name)
    end

    it 'Delete question' do
      visit '/admin/questions'

      click_on 'Destroy'
      page.accept_alert

      expect(page).to have_text('Question was successfully destroyed.')
    end
  end
end
