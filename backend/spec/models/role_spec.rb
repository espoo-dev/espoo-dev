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

  describe '#admin?' do
    let!(:admin) { create(:user) }

    it { expect(admin).to be_admin }
  end

  describe '#destroy' do
    describe 'When there are users for role' do
      let!(:role) { create(:user).role }

      it 'does not destroy' do
        role.destroy
        expect(role.errors.full_messages.first).to match("Can't destroy role with 1 users")
      end

      it { expect(described_class.count).to eq(1) }
    end

    describe 'When there are no users for role' do
      let!(:role) { create(:role) }

      it { expect(role.destroy).to be_truthy }

      it 'does not have any role when delete role' do
        role.destroy
        expect(described_class.count).to be_zero
      end
    end
  end

  describe 'factory only creates one instance of each role' do
    it { expect(create(:role)).to eq(create(:role)) }

    it { expect(create(:role_admin)).to eq(create(:role_admin)) }

    it { expect(create(:role_teacher)).to eq(create(:role_teacher)) }

    it { expect(create(:role_moderator)).to eq(create(:role_moderator)) }
  end

end
