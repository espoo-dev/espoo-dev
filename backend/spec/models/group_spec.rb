require 'rails_helper'

RSpec.describe Group, type: :model do
  subject { build(:group) }

  describe 'relationships' do
    it { is_expected.to belong_to(:user).required }
    it { is_expected.to belong_to(:group_dependency).optional }
    it { is_expected.to belong_to(:trail).optional }
    it { is_expected.to have_many(:surveys).dependent(:nullify) }
    it { is_expected.to have_one(:required_group_dependency).dependent(:destroy) }
  end

  it { is_expected.to validate_uniqueness_of(:name).scoped_to(:user_id) }
  it { is_expected.to validate_presence_of(:name) }

  describe '#position' do
    context 'when has no dependencies' do
      it 'returns zero' do
        group = create(:group)
        expect(group.position).to eq(0)
      end
    end

    context 'when has 1 dependency level' do
      it 'returns 1' do
        group = create(:group_with_1_group_dependency)
        expect(group.position).to eq(1)
      end
    end

    context 'when has 2 dependencies levels' do
      it 'returns 2' do
        group = create(:group_with_2_group_dependencies_levels)
        expect(group.position).to eq(2)
      end
    end
  end

  describe '#status' do
    context 'when has no dependencies' do
      it 'returns STATUS_AVAILABLE' do
        group = create(:group)
        expect(group.status(group.user)).to eq(Group::STATUS_AVAILABLE)
      end
    end

    context 'when all required_groups and all surveys are completed' do
      it 'returns STATUS_COMPLETED' do
        group = create(:group_answered_with_1_group_dependency_answered)
        expect(group.status(group.user)).to eq(Group::STATUS_COMPLETED)
      end
    end

    context 'when all required_groups are completed but surveys are imcompleted' do
      it 'returns STATUS_DOING' do
        group = create(:group_with_1_group_dependency_answered)
        expect(group.status(group.user)).to eq(Group::STATUS_DOING)
      end
    end

    context 'when all required_groups are not completed' do
      it 'returns STATUS_BLOCKED' do
        group = create(:group_with_1_group_dependency_not_answered)
        expect(group.status(group.user)).to eq(Group::STATUS_BLOCKED)
      end
    end
  end
end
