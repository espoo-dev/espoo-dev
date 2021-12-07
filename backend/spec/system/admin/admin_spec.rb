require 'rails_helper'

RSpec.describe 'Admin', type: :system do
  let(:user) { create(:user) }
  let(:user_moderator) { create(:user_moderator) }

  describe 'when logged in redirect to admin page' do
    before do
      sign_in user
      visit admin_root_path
    end

    it { expect(page).to have_current_path(admin_root_path) }
  end

  describe 'When user is not logged' do
    before do
      visit admin_root_path
    end

    it { expect(page).to have_current_path(new_user_session_path) }
  end
end
