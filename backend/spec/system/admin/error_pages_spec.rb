require 'rails_helper'

RSpec.describe 'Error pages', type: :system do
  describe 'Not found' do
    before do
      sign_in create(:user)
      visit edit_admin_user_path(-1)
    end

    it { expect(page).to have_current_path('/404.html') }
  end

  describe 'Unauthorized' do
    before do
      sign_in create(:user_teacher)
      visit admin_roles_path
    end

    it { expect(page).to have_current_path('/401.html') }
  end
end
