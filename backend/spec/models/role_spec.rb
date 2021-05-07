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
end
