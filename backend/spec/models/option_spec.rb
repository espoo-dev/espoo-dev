require 'rails_helper'

RSpec.describe Option, type: :model do
  let(:option) { create(:option) }

  it { expect(option).to be_valid }

  describe 'presence' do
    it { is_expected.to validate_presence_of(:name) }
  end

  describe 'relationships' do
    it { is_expected.to belong_to(:user).required }
  end
end
