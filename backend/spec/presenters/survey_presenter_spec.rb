# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SurveyPresenter do
  subject(:presenter) { described_class.new(survey, user) }

  let!(:user) { create(:user) }
  let!(:answers_survey) { create(:answers_survey_with_some_answers, user: user) }
  let!(:survey) { answers_survey.survey }
  let!(:survey_subject) { survey.survey_subject }
  let!(:survey_question) { survey.questions.first }
  let!(:survey_question2) { survey.questions.second }
  let!(:option) { survey_question.options.first }
  let!(:option3) { survey_question.options.second }
  let!(:option2) { survey_question2.options.first }
  let!(:question_type) { survey_question.question_type }
  let(:answered_question_attributes) do
    {
      'id' => survey_question.id,
      'name' => survey_question.name,
      'question_type' => {
        'id' => question_type.id,
        'name' => question_type.name
      }.transform_keys(&:to_sym),
      'options' => [{
        'id' => option.id,
        'name' => option.name,
        'correct' => option.correct
      }.transform_keys(&:to_sym),
                    {
                      'id' => option3.id,
                      'name' => option3.name,
                      'correct' => option3.correct
                    }.transform_keys(&:to_sym)]
    }.transform_keys(&:to_sym)
  end
  let(:unanswered_question_attributes) do
    {
      'id' => survey_question2.id,
      'name' => survey_question2.name,
      'question_type' => {
        'id' => question_type.id,
        'name' => question_type.name
      }.transform_keys(&:to_sym),
      'options' => [{
        'id' => option2.id,
        'name' => option2.name,
        'correct' => option2.correct
      }.transform_keys(&:to_sym)]
    }.transform_keys(&:to_sym)
  end
  let(:question_attributes) do
    [
      answered_question_attributes,
      unanswered_question_attributes
    ]
  end
  let(:answers_surveys_attributes) do
    [
      {
        'id' => answers_survey.id,
        'user_id' => answers_survey.user.id,
        'status' => answers_survey.status,
        'questions' => question_attributes,
        'answered_questions' => [answered_question_attributes],
        'not_answered_questions' => [unanswered_question_attributes],
        'current_question_index' => 1
      }.transform_keys(&:to_sym)
    ]
  end
  let(:current_answers_survey_attributes) { answers_surveys_attributes.first }

  it { expect(presenter).not_to respond_to(:payload).with(2).arguments }

  it { expect(presenter).to respond_to(:payload).with(0).arguments }

  describe '#payload' do
    it 'matches expected attributes when complete' do
      expected_payload = {
        'id' => survey.id,
        'name' => survey.name,
        'description' => survey.description,
        'survey_subject_id' => survey_subject.id,
        'answered_questions_quantity' => 1,
        'total_questions_quantity' => 2,
        'questions' => question_attributes,
        'answers_surveys' => answers_surveys_attributes,
        'current_answers_survey' => current_answers_survey_attributes
      }.transform_keys(&:to_sym)

      expect(presenter.payload).to eq expected_payload
    end
  end
end
