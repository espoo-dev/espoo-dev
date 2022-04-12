require 'rails_helper'

RSpec.describe 'Group CRUD', type: :system do
  describe 'CRUD' do
    let(:user_admin) { create(:user_admin) }
    let(:user_teacher) { create(:user_teacher) }
    let!(:group_admin) { create(:group_with_1_group_dependency, user_id: user_admin.id) }
    let!(:group_teacher) { create(:group_with_1_group_dependency, user_id: user_teacher.id) }
    let!(:group_dependency_group_admin) { GroupDependency.first }
    let!(:group_dependency_group_teacher) { GroupDependency.last }

    describe '#index' do
      context 'when admin' do
        before do
          sign_in user_admin
          visit admin_groups_path
        end

        it 'sees all groups' do
          Group.all.each do |group|
            expect(page).to have_content group.name
          end
        end
      end

      context 'when teacher' do
        before do
          sign_in user_teacher
          visit admin_groups_path
        end

        it { expect(page).to have_content group_teacher.name }
        it { expect(page).not_to have_content group_admin.name }
      end
    end

    describe '#show' do
      context 'when admin' do
        before do
          sign_in user_admin
          visit admin_group_path(group_admin)
        end

        it { expect(page).to have_content group_admin.name }
        it { expect(page).to have_content "GroupDependency ##{group_dependency_group_admin.id}, #{group_dependency_group_admin.group.name}" }
      end

      context 'when teacher' do
        before do
          sign_in user_teacher
          visit admin_group_path(group_teacher)
        end

        it { expect(page).to have_content group_teacher.name }
        it { expect(page).to have_content "GroupDependency ##{group_dependency_group_teacher.id}, #{group_dependency_group_teacher.group.name}" }
      end
    end
  end
end
