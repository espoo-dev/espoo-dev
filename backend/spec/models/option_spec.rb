require 'rails_helper'

RSpec.describe Option, type: :model do
  let!(:question_single) { create(:single_choice_question) }
  let!(:option) { build(:option, question_id: question_single.id, correct: true) }

  it { expect(option).to be_valid }

  describe 'presence' do
    it { is_expected.to validate_presence_of(:name) }
  end

  describe 'relationships' do
    it { is_expected.to belong_to(:user).required }
    it { is_expected.to belong_to(:question).required }
  end

  describe 'option validation' do
    before do
      create(:option, correct: true, question_id: question_single.id)
      option.valid?
    end

    describe 'when many options are set to correct' do
      it { expect(option.errors.full_messages).to match(['Single choice questions should have no more than one correct option.']) }
      it { expect(option).not_to be_valid }
    end
  end

  describe 'scopes' do
    before do
      create_list(:option, 2)
      create_list(:option, 3, correct: true)
    end

    it { expect(described_class.correct.count).to eq(3) }
  end
end
