require 'rails_helper'

RSpec.describe Survey, type: :model do
  describe 'relationships' do
    it { is_expected.to belong_to(:user).required }
    it { is_expected.to have_many(:questions) }
  end
end
