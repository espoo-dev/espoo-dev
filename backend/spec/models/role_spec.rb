require 'rails_helper'

RSpec.describe Role, type: :model do
  describe 'relationships' do
    it { is_expected.to have_many(:users) }
  end

  describe 'presence' do
    it { is_expected.to validate_presence_of(:role_type) }
  end

  describe 'uniqueness' do
    it { is_expected.to validate_uniqueness_of(:role_type) }
  end

  describe '#destroy' do
    describe 'When there are users for role' do
      let!(:role) { create(:user).role }

      it 'does not destroy' do
        role.destroy
        expect(role.errors.full_messages.first).to match("Can't destroy role with 1 users")
        expect(described_class.count).to eq(1)
      end
    end

    describe 'When there are no users for role' do
      let!(:role) { create(:role) }

      it 'destroys' do
        expect(role.destroy).to be_truthy
        expect(described_class.count).to be_zero
      end
    end
  end
end
