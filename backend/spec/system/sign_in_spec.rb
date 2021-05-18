require 'rails_helper'

RSpec.describe 'User sign in', type: :system do
  let(:user) { create(:user) }

  describe 'When data is valid' do
    before do
      visit new_user_session_path
      fill_in 'Email', with: user.email
      fill_in 'Password', with: user.password

      click_on 'Log in'
    end

    it { expect(page).to have_current_path('/') }

    it { expect(page).to have_text('Signed in successfully') }

    it { expect(page).to have_link('Logout', href: destroy_user_session_path) }

    it 'when can click on logout button' do
      click_on 'Logout'
      expect(page).to have_current_path(user_session_path)
    end
  end

  describe 'When data is not valid' do
    it 'does not log in' do
      visit new_user_session_path
      fill_in 'Email', with: user.email
      fill_in 'Password', with: 'invalid password'

      click_on 'Log in'

      expect(page).to have_current_path(new_user_session_path)
    end
  end
end
