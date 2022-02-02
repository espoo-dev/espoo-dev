require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { create(:user) }
  let(:user_teacher) { create(:user_teacher) }

  it { expect(user).to be_admin }

  it { expect(user).to be_valid }

  describe 'relationships' do
    it { is_expected.to have_many(:surveys).dependent(:destroy) }
    it { is_expected.to have_many(:questions).dependent(:destroy) }
    it { is_expected.to have_many(:options).dependent(:destroy) }
    it { is_expected.to have_many(:answers_surveys).dependent(:destroy) }
    it { is_expected.to have_many(:groups).dependent(:destroy) }
    it { is_expected.to belong_to(:role) }
  end
end
