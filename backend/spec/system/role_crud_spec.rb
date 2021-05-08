require 'rails_helper'

RSpec.describe 'Role CRUD', type: :system do
  include Devise::Test::IntegrationHelpers
  describe 'CRUD' do
    before do
      sign_in create(:user)
    end

    describe 'list' do
      it 'visits roles' do
        visit '/admin/roles'

        expect(page).to have_content 'Role'
      end
    end

    describe 'destroy' do
      it 'cannot destroy role' do
        visit '/admin/roles'

        expect(page).not_to have_content 'Destroy'
      end
    end
  end
end
