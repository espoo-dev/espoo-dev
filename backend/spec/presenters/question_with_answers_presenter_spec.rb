# frozen_string_literal: true

require 'rails_helper'

RSpec.describe QuestionWithAnswersPresenter do
  subject(:presenter) { described_class.new(question, answers_survey) }

  let!(:answers_survey) { create(:answers_survey_with_some_answers) }
  let!(:survey) { answers_survey.survey }
  let!(:question) { survey.questions.first }

  describe '#correct' do
    context 'when question answer contains incorrect options' do
      it 'returns false' do
        expect(presenter.payload[:correct]).to be false
      end
    end

    context 'when question answer contains correct options' do
      it 'returns true' do
        question.options.second.update!(correct: true)
        question.options.first.update!(correct: false)
        expect(presenter.payload[:correct]).to be true
      end
    end
  end

  describe '#answered_options' do
    context 'when it has multiple answered options' do
      let(:answers_survey) { create(:answers_survey_with_multiple_options_answers) }

      context 'when renders all answered options' do
        it { expect(presenter.payload[:answered_options].count).to eq 2 }
      end
    end
  end
end
