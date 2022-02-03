require 'rails_helper'

RSpec.describe 'Groups' do
  describe 'answer_with_option' do
    let!(:group) { create(:group_with_1_group_dependency) }

    it { expect(Group.count).to eq(2) }

    it { expect(GroupDependency.count).to eq(1) }

    it { expect(group.required_groups.count).to eq(1) }
  end
end
