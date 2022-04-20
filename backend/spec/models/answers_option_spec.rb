require 'rails_helper'

RSpec.describe AnswersOption, type: :model do
  describe 'relationships' do
    %i[option answer].each do |sym|
      it { is_expected.to belong_to(sym).required }
    end
    it { is_expected.to have_one(:user).through(:option) }
  end

  describe '.by_user' do
    let!(:answers_survey1) { create(:answers_survey_with_all_answers) }
    let!(:user1) { answers_survey1.survey.user }
    let!(:answers_options1) { answers_survey1.answers.map(&:answers_options).flatten }
    let!(:answers_survey2) { create(:answers_survey_with_all_answers) }
    let!(:user2) { answers_survey2.survey.user }

    it 'returns answers_options that belongs to user' do
      expect(described_class.by_user(user1)).to eq(answers_options1)
    end

    it 'returns all answers_options' do
      all_answers_options = described_class.by_user(user1) + described_class.by_user(user2)
      expect(described_class.all).to eq(all_answers_options)
    end
  end
end
