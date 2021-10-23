require 'rails_helper'

RSpec.describe 'User sign in', type: :system do
  let(:user) { create(:user) }
  let(:user_student) { create(:user_student) }

  describe 'When data is valid' do
    before do
      visit new_user_session_path
      fill_in 'Email', with: user.email
      fill_in 'Password', with: user.password

      click_on 'Login'
    end

    it { expect(page).to have_current_path('/') }

    it { expect(page).to have_text('Signed in successfully') }

    it { expect(page).to have_link('Logout', href: destroy_user_session_path) }

    it 'when can click on logout button' do
      click_on 'Logout'
      expect(page).to have_current_path(user_session_path)
    end
  end

  context 'when the user is a student' do
    before do
      visit new_user_session_path
      fill_in 'Email', with: user_student.email
      fill_in 'Password', with: user_student.password
      click_on 'Login'
    end

    it { expect(page).to have_current_path(surveys_path) }
  end

  describe 'When data is not valid' do
    before do
      visit new_user_session_path
      fill_in 'Email', with: user.email
      fill_in 'Password', with: 'invalid password'

      click_on 'Login'
    end

    it { expect(page).to have_current_path(new_user_session_path) }
    it { expect(page).to have_text('Invalid Email or password') }
  end
end
