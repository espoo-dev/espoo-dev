require 'rails_helper'

RSpec.describe Group, type: :model do
  subject { build(:group) }

  describe 'relationships' do
    it { is_expected.to belong_to(:user).required }
    it { is_expected.to belong_to(:group_dependency).optional }
    it { is_expected.to have_many(:surveys).dependent(:nullify) }
    it { is_expected.to have_one(:required_group_dependency).dependent(:destroy) }
  end

  it { is_expected.to validate_uniqueness_of(:name).scoped_to(:user_id) }

  it { is_expected.to validate_presence_of(:name) }

  describe 'position' do
    it 'returns zero when has no dependencies' do
      group = create(:group)
      expect(group.position).to eq(0)
    end

    it 'returns 1 when has 1 dependency level' do
      group = create(:group_with_1_group_dependency)
      expect(group.position).to eq(1)
    end

    it 'returns 1 when has 2 dependencies levels' do
      group = create(:group_with_2_group_dependencies_levels)
      expect(group.position).to eq(2)
    end
  end
end
