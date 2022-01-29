require 'rails_helper'

RSpec.describe 'Surveys' do
  describe 'survey_with_2_questions' do
    before do
      create(:survey_with_2_questions)
    end

    it { expect(Survey.count).to eq(1) }

    it { expect(Question.count).to eq(2) }
  end

  describe 'survey_with_two_questions_two_answers' do
    before do
      create(:survey_with_two_questions_two_answers)
    end

    it { expect(Survey.count).to eq(1) }

    it { expect(Question.count).to eq(2) }

    it { expect(Answer.count).to eq(2) }

    it { expect(AnswersSurvey.count).to eq(1) }

    it { expect(User.count).to eq(1) }

    it 'has one answer for first question' do
      question = Question.first
      answers = Answer.where(question: question)
      expect(answers.count).to eq(1)
    end

    it 'has one answer for second question' do
      question = Question.second
      answers = Answer.where(question: question)
      expect(answers.count).to eq(1)
    end
  end

  describe 'survey_with_two_questions_one_answer' do
    before do
      create(:survey_with_two_questions_one_answer)
    end

    it { expect(Survey.count).to eq(1) }

    it { expect(Question.count).to eq(2) }

    it { expect(Answer.count).to eq(1) }

    it { expect(AnswersSurvey.count).to eq(1) }

    it { expect(User.count).to eq(1) }

    it 'has one answer for first question' do
      question = Question.first
      answers = Answer.where(question: question)
      expect(answers.count).to eq(1)
    end

    it 'has no answer for second question' do
      question = Question.second
      answers = Answer.where(question: question)
      expect(answers.count).to eq(0)
    end
  end
end
