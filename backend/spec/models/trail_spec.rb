require 'rails_helper'

RSpec.describe Trail, type: :model do
  subject { build(:trail) }

  describe 'relationships' do
    it { is_expected.to have_many(:groups).dependent(:nullify) }
    it { is_expected.to belong_to(:user).dependent(:destroy) }
  end
end
