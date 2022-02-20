require 'rails_helper'

RSpec.describe 'Group CRUD', type: :system do
  describe 'CRUD' do
    let!(:group) { create(:group_with_1_group_dependency) }
    let!(:group_dependency) { GroupDependency.first }
    let!(:user) { create(:user) }

    before do
      sign_in user
    end

    describe 'show' do
      before do
        visit admin_group_path(group)
      end

      it { expect(page).to have_content group.name }
      it { expect(page).to have_content "GroupDependency ##{group_dependency.id}, #{group_dependency.group.name}" }
    end
  end
end
