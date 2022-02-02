require 'rails_helper'

RSpec.describe Group, type: :model do
  subject { build(:group) }

  describe 'relationships' do
    it { is_expected.to belong_to(:user).required }
    it { is_expected.to have_many(:surveys).dependent(:nullify) }
    it { is_expected.to have_one(:required_group_dependency).dependent(:destroy) }
  end

  it { is_expected.to validate_uniqueness_of(:name).scoped_to(:user_id) }

  it { is_expected.to validate_presence_of(:name) }
end
