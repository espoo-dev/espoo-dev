require 'rails_helper'

RSpec.describe 'Answers' do
  describe 'answer_with_option' do
    before { create(:answer_with_option) }

    [Survey, Question, Answer, Option, AnswersSurvey].each do |model|
      it { expect(model.count).to eq(1) }
    end
  end
end
