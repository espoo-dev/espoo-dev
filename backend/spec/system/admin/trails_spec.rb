require 'rails_helper'

RSpec.describe 'Trail CRUD', type: :system do
  describe 'CRUD' do
    let!(:trail) { create(:trail_with_1_group) }
    let(:user) { create(:user) }

    before do
      sign_in user
    end

    describe 'index' do
      before do
        visit admin_trails_path
      end

      it { expect(page).to have_content trail.groups.count.to_s }
      it { expect(page).to have_content trail.name.to_s }
    end

    describe 'show' do
      before do
        visit admin_trail_path(trail)
      end

      it { expect(page).to have_content "Trail #{trail.name}" }
    end
  end
end
