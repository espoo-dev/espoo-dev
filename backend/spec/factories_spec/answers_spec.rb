require 'rails_helper'

RSpec.describe 'Answers' do
  describe 'answer_with_option' do
    before { create(:answer_with_option) }

    it { expect(Survey.count).to eq(1) }

    it { expect(Question.count).to eq(1) }

    it { expect(Answer.count).to eq(1) }

    it { expect(Option.count).to eq(1) }

    it { expect(AnswersSurvey.count).to eq(1) }
  end
end
