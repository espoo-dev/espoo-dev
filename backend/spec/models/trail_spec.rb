require 'rails_helper'

RSpec.describe Trail, type: :model do
  subject { build(:trail) }

  describe 'relationships' do
    it { is_expected.to have_many(:groups).dependent(:nullify) }
    it { is_expected.to belong_to(:user).dependent(:destroy) }
  end

  describe '#ordered_groups' do
    let!(:trail) { create(:trail) }
    let!(:group1) { create(:group, trail: trail) }
    let!(:group2) { create(:group, trail: trail) }

    context 'when group 2 is dependent of group 1' do
      it 'order groups by position' do
        group1.add_required_group!(group2)
        group1.save
        group2.save
        expect(trail.reload.ordered_groups).to match [group2, group1]
      end
    end

    context 'when group 1 is dependent of group 2' do
      it 'order groups by position' do
        group2.add_required_group!(group1)
        group1.save
        group2.save
        expect(trail.reload.ordered_groups).to match [group1, group2]
      end
    end
  end
end
