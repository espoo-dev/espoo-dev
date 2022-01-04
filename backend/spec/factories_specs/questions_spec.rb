require 'rails_helper'

RSpec.describe 'QuestionsFactory' do
  describe 'multiple_choice_ready_question' do
    before do
      create(:multiple_choice_ready_question)
    end

    it { expect(Question.count).to eq(1) }

    it { expect(Option.count).to eq(1) }
  end
end

