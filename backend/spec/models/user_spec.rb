require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { create(:user) }

  it { expect(user).to be_valid }

  describe 'inclusion' do
    it { is_expected.to validate_inclusion_of(:role).in_array(User::ROLES) }
  end
end
