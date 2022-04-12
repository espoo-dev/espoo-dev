require 'rails_helper'

RSpec.describe 'GroupDependency CRUD', type: :system do
  describe 'CRUD' do
    let(:user_admin) { create(:user_admin) }
    let(:user_teacher) { create(:user_teacher) }
    let!(:group_admin) { create(:group_with_1_group_dependency, user: user_admin) }
    let!(:group_teacher) { create(:group_with_1_group_dependency, user: user_teacher) }
    let!(:group_dependency_group_admin) { GroupDependency.first }
    let!(:group_dependency_group_teacher) { GroupDependency.last }

    describe '#index' do
      context 'when admin' do
        before do
          sign_in user_admin
          visit admin_group_dependencies_path
        end

        it 'sees all GroupDependencies' do
          GroupDependency.all do |group_dependency|
            expect(page).to have_content "Group #{group_dependency.group.name}"
          end
        end
      end

      context 'when teacher' do
        before do
          sign_in user_teacher
          visit admin_group_dependencies_path
        end

        it { expect(page).to have_content "Group #{group_dependency_group_teacher.group.name}" }
        it { expect(page).not_to have_content "Group #{group_dependency_group_admin.group.name}" }
      end
    end

    describe '#show' do
      context 'when admin' do
        before do
          sign_in user_admin
          visit admin_group_dependency_path(group_dependency_group_admin)
        end

        it { expect(page).to have_content "GroupDependency ##{group_dependency_group_admin.id}, #{group_admin.name}" }
      end

      context 'when teacher' do
        before do
          sign_in user_teacher
          visit admin_group_dependency_path(group_dependency_group_teacher)
        end

        it { expect(page).to have_content "GroupDependency ##{group_dependency_group_teacher.id}, #{group_teacher.name}" }
      end
    end
  end
end
