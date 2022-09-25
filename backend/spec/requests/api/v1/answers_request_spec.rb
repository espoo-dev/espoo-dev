require 'rails_helper'

RSpec.describe 'AnswersController', type: :request do
  describe '#create' do
    context 'when data is valid' do
      let!(:user_teacher) { create(:user_teacher) }
      let!(:user_student) { create(:user_student) }
      let!(:survey) { create(:survey, user: user_teacher) }
      let!(:question) { create(:multiple_choice_question, user: user_teacher, survey: survey) }
      let!(:another_question) { create(:multiple_choice_question, user: user_teacher, survey: survey) }
      let!(:answers_survey) { create(:answers_survey, user: user_student, survey: survey) }
      let!(:option_a) { create(:option, user: user_teacher, question: question) }
      let!(:option_b) { create(:option, user: user_teacher, question: question) }
      let!(:option_c) { create(:option, user: user_teacher, question: another_question) }
      let!(:option_d) { create(:option, user: user_teacher, question: another_question) }

      before do
        answer_params = {
          question_id: question.id,
          option_ids: [option_a.id, option_b.id],
          answers_survey_id: answers_survey.id
        }

        post api_v1_answers_path, params: answer_params, headers: auth_headers(user: user_student)
      end

      it { expect(response).to have_http_status :created }

      it { expect(Answer.count).to eq(1) }

      it { expect(Answer.first.options.count).to eq(2) }

      it 'has question and answers_survey with same survey' do
        expect(answers_survey.survey).to eq(question.survey)
      end

      it 'matches answer attributes' do
        expected_attributes = {
          'id' => anything,
          'question_id' => question.id,
          'options' => [{
            'id' => option_a.id,
            'name' => option_a.name,
            'correct' => option_a.correct
          },
                        {
                          'id' => option_b.id,
                          'name' => option_b.name,
                          'correct' => option_b.correct
                        }],
          'answers_survey_id' => answers_survey.id,
          'user_answer' => nil
        }
        expect(response_body).to match(expected_attributes)
      end

      context 'when answer is free text' do
        let!(:user_teacher) { create(:user_teacher) }
        let!(:user_student) { create(:user_student) }
        let!(:answers_survey) { create(:answers_survey, user: user_student) }
        let!(:question) { create(:free_text_question, user: user_teacher) }

        before do
          answer_params = {
            question_id: question.id,
            user_answer: 'super user answer',
            answers_survey_id: answers_survey.id
          }

          post api_v1_answers_path, params: answer_params, headers: auth_headers(user: user_student)
        end

        it { expect(response).to have_http_status :created }

        it { expect(Answer.count).to eq(1) }

        it { expect(Answer.first.options.count).to eq(0) }

        it 'matches answer attributes' do
          expected_attributes = {
            'id' => anything,
            'question_id' => question.id,
            'options' => [],
            'user_answer' => 'super user answer',
            'answers_survey_id' => answers_survey.id
          }
          expect(response_body).to match(expected_attributes)
        end
      end

      context 'when answers_survey is not completed' do
        it 'has answers_survey not completed' do
          expect(answers_survey.completed?).to be(false)
        end

        it 'not calls SlackNotifierService for the current answers_survey)' do
          expect(NotificationSlackJob).not_to have_been_enqueued
        end
      end

      context 'when answers_survey is completed' do
        let(:total_completed_answers_surveys) { 1 }

        let(:message) do
          "Survey \"#{answers_survey.survey.name}\" from teacher \"#{user_teacher.email}\" "\
            "has been answered now.\nThis survey has #{total_completed_answers_surveys} answers in the total.\n"
        end

        before do
          answer_params = {
            question_id: another_question.id,
            option_ids: [option_c.id, option_d.id],
            answers_survey_id: answers_survey.id
          }

          post api_v1_answers_path, params: answer_params, headers: auth_headers(user: user_student)
        end

        it { expect(answers_survey.completed?).to be(true) }

        it { expect(NotificationSlackJob).to have_been_enqueued.with(message: message) }
      end
    end

    context 'when data is not valid' do
      let!(:user_teacher) { create(:user_teacher) }
      let!(:user_student) { create(:user_student) }
      let!(:answers_survey) { create(:answers_survey, user: user_student) }
      let!(:question) { create(:question, user: user_teacher) }
      let!(:option_a) { create(:option, user: user_teacher) }
      let!(:option_b) { create(:option, user: user_teacher) }
      let(:option_ids) { [option_a.id, option_b.id] }

      before do
        answer_params = {
          question_id: question.id,
          option_ids: option_ids,
          answers_survey_id: answers_survey.id
        }

        post api_v1_answers_path, params: answer_params, headers: auth_headers(user: user_student)
      end

      it { expect(NotificationSlackJob).not_to have_been_enqueued }

      context 'when question is single choice and answer has more than one option' do
        it { expect(response).to have_http_status :unprocessable_entity }
      end

      context 'when question is not free text and answer has no options' do
        let(:option_ids) { nil }

        it { expect(response).to have_http_status :unprocessable_entity }
      end
    end
  end
end
