require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { create(:user) }
  let(:user_teacher) { create(:user_teacher) }

  it { expect(user_teacher).to be_teacher }

  it { expect(user).to be_admin }

  it { expect(user).to be_valid }

  describe 'inclusion' do
    it { is_expected.to validate_inclusion_of(:role).in_array(User::ROLES) }
  end

  describe 'relationships' do
    it { is_expected.to have_many(:surveys).dependent(:destroy) }
  end
end
