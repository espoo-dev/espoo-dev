# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SimpleSurveyPresenter do
  subject(:presenter) { described_class.new(survey, user) }

  let(:survey) { create(:survey_with_two_questions_one_answer) }
  let(:last_answers_survey) { survey.last_answers_survey(user) }
  let(:user) { survey.user }

  it { expect(presenter).not_to respond_to(:payload).with(2).arguments }

  it { expect(presenter).to respond_to(:payload).with(0).arguments }

  describe '#payload' do
    it 'matches expected attributes' do
      expected_payload = {
        id: survey.id,
        name: survey.name,
        description: survey.description,
        total_questions_quantity: 2,
        answered_questions_quantity: 1,
        icon_url: survey.icon_url,
        image_url: survey.image_url
      }
      expect(presenter.payload).to eq expected_payload
    end
  end

  describe '#answered_questions_quantity' do
    let(:user2) { create(:user) }

    before do
      first_question = last_answers_survey.survey.questions.first
      first_option = first_question.options.first
      second_question = last_answers_survey.survey.questions.second
      second_option = second_question.options.first

      answers_survey = create(:answers_survey, survey: survey, user: user2)
      create(:answer, answers_survey: answers_survey, question: first_question, options: [first_option])
      create(:answer, answers_survey: answers_survey, question: second_question, options: [second_option])
    end

    context 'when has quantity 1 for user' do
      it { expect(presenter.payload[:answered_questions_quantity]).to eq(1) }
    end

    it 'has quantity 2 for user2' do
      presenter = described_class.new(survey, user2)
      expect(presenter.payload[:answered_questions_quantity]).to eq(2)
    end
  end
end
