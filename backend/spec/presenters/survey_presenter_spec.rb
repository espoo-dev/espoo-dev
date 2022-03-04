# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SurveyPresenter do
  subject(:presenter) { described_class.new(survey, user) }

  let!(:user) { create(:user) }
  let!(:answers_survey) { create(:answers_survey_with_some_answers, user: user) }
  let!(:survey) { answers_survey.survey }

  it { expect(presenter).not_to respond_to(:payload).with(2).arguments }

  it { expect(presenter).to respond_to(:payload).with(0).arguments }

  describe '#payload' do
    it 'matches expected attributes when complete' do
      expected_payload = survey_sym(survey, answers_survey)

      expect(presenter.payload).to eq expected_payload
    end
  end

  describe '#compare' do
    let!(:user) { create(:user) }
    let!(:not_started_survey2) { create(:answers_survey, user: user).survey }
    let!(:not_started_survey2_presenter) { described_class.new(not_started_survey2, user) }
    let!(:completed_survey) { create(:answers_survey_with_all_answers, user: user).survey }
    let!(:completed_survey_presenter) { described_class.new(completed_survey, user) }
    let!(:without_answers_survey) { create(:ready_survey, user: user) }
    let!(:without_answers_survey_presenter) { described_class.new(without_answers_survey, user) }
    let!(:started_survey) { create(:answers_survey_with_some_answers, user: user).survey }
    let!(:started_survey_presenter) { described_class.new(started_survey, user) }
    let!(:not_started_survey) { create(:answers_survey, user: user).survey }
    let!(:not_started_survey_presenter) { described_class.new(not_started_survey, user) }

    it 'has no answers survey for without_answers_survey' do
      expect(without_answers_survey.answers_surveys).to be_empty
    end

    it 'has status not_started for not_started_survey' do
      expect(not_started_survey.answers_surveys.last.status).to eq(AnswersSurvey::NOT_STARTED)
    end

    it 'has status completed for completed_survey' do
      expect(completed_survey.answers_surveys.last.status).to eq(AnswersSurvey::COMPLETED)
    end

    it 'has status started for started_survey' do
      expect(started_survey.answers_surveys.last.status).to eq(AnswersSurvey::STARTED)
    end

    context 'when without_answers_survey_presenter' do
      it 'returns that without_answers_survey_presenter is lesser than all others surveys presenter' do
        survey_presenters_array = [
          not_started_survey_presenter,
          started_survey_presenter,
          completed_survey_presenter
        ]

        survey_presenters_array.each do |survey_presenter|
          expect(without_answers_survey_presenter.compare(survey_presenter)).to eq(-1)
        end
      end

      it { expect(without_answers_survey_presenter.compare(without_answers_survey_presenter)).to eq(0) }
    end

    context 'when not_started_survey_presenter' do
      it 'returns that not_started_survey_presenter is greater than without_answers_survey_presenter' do
        result = not_started_survey_presenter.compare(without_answers_survey_presenter)

        expect(result).to eq(1)
      end

      it 'returns that not_started_survey_presenter is lesser than started_survey_presenter and completed_survey_presenter' do
        survey_presenters_array = [
          started_survey_presenter,
          completed_survey_presenter
        ]

        survey_presenters_array.each do |survey_presenter|
          expect(not_started_survey_presenter.compare(survey_presenter)).to eq(-1)
        end
      end

      it { expect(not_started_survey_presenter.compare(not_started_survey_presenter)).to eq(0) }
    end

    context 'when started_survey_presenter' do
      it 'returns that started_survey_presenter is greater than without_answers_survey_presenter and not_started_survey_presenter' do
        survey_presenters_array = [
          without_answers_survey_presenter,
          not_started_survey_presenter
        ]

        survey_presenters_array.each do |survey_presenter|
          expect(started_survey_presenter.compare(survey_presenter)).to eq(1)
        end
      end

      it 'returns that started_survey_presenter is lesser than completed_survey_presenter' do
        result = started_survey_presenter.compare(completed_survey_presenter)

        expect(result).to eq(-1)
      end

      it { expect(started_survey_presenter.compare(started_survey_presenter)).to eq(0) }
    end

    context 'when completed_survey_presenter' do
      it 'returns that completed_survey_presenter is greater than without_answers_survey_presenter, not_started_survey_presenter and started_survey_presenter' do
        survey_presenters_array = [
          without_answers_survey_presenter,
          not_started_survey_presenter,
          started_survey_presenter
        ]

        survey_presenters_array.each do |survey_presenter|
          expect(completed_survey_presenter.compare(survey_presenter)).to eq(1)
        end
      end

      it { expect(completed_survey_presenter.compare(completed_survey_presenter)).to eq(0) }
    end

    it 'sort list by status' do
      not_sorted_list = [
        not_started_survey2_presenter,
        completed_survey_presenter,
        without_answers_survey_presenter,
        started_survey_presenter,
        not_started_survey_presenter
      ]

      expect(not_sorted_list.sort(&:compare).map(&:status)).to match(
        [
          nil,
          AnswersSurvey::NOT_STARTED,
          AnswersSurvey::NOT_STARTED,
          AnswersSurvey::STARTED,
          AnswersSurvey::COMPLETED
        ]
      )
    end
  end
end
