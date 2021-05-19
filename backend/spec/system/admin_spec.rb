require 'rails_helper'

RSpec.describe 'Admin', type: :system do
  include Devise::Test::IntegrationHelpers

  let(:user) { create(:user) }
  let(:user_moderator) { create(:user_moderator) }

  describe 'When user is logged' do
    it 'goes to admin page' do
      sign_in user
      visit admin_root_path

      expect(page).to have_current_path(admin_root_path)
    end
  end

  describe 'When user is not logged' do
    it 'does log in' do
      visit admin_root_path

      expect(page).to have_current_path(new_user_session_path)
    end
  end
end
