require 'rails_helper'

RSpec.describe Question, type: :model do
  let(:question) { create(:question) }

  it { expect(question).to be_valid }

  describe 'relationship' do
    it { is_expected.to belong_to(:question_type).required }
    it { is_expected.to belong_to(:survey).optional }
    it { is_expected.to belong_to(:user).required }
    it { is_expected.to have_many(:options).dependent(:destroy) }
  end

  describe 'presence' do
    it { is_expected.to validate_presence_of(:name) }
  end
end
