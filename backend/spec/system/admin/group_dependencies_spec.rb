require 'rails_helper'

RSpec.describe 'GroupDependency CRUD', type: :system do
  describe 'CRUD' do
    let!(:user) { create(:user) }
    let!(:group) { create(:group_with_1_group_dependency, user: user) }
    let!(:group_dependency) { GroupDependency.first }

    before do
      sign_in user
    end

    describe 'show' do
      before do
        visit admin_group_dependency_path(group_dependency)
      end

      it { expect(page).to have_content "Group #{group.name}" }
    end
  end
end
