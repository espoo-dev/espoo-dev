require 'rails_helper'

RSpec.describe Question, type: :model do
  let(:question) { create(:question) }

  it { expect(question).to be_valid }

  describe 'presence' do
    it { is_expected.to validate_presence_of(:name) }
  end
end
