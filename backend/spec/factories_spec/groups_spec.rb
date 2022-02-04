require 'rails_helper'

RSpec.describe 'Groups' do
  describe 'group_with_1_group_dependency' do
    let!(:group) { create(:group_with_1_group_dependency) }

    it { expect(Group.count).to eq(2) }

    it { expect(GroupDependency.count).to eq(1) }

    it { expect(group.required_groups.count).to eq(1) }
  end

  describe 'group_with_2_group_dependencies_levels' do
    let!(:group) { create(:group_with_2_group_dependencies_levels) }

    it { expect(Group.count).to eq(3) }

    it { expect(GroupDependency.count).to eq(2) }

    it { expect(group.required_groups.count).to eq(1) }
  end
end
