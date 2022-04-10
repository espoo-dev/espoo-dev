require 'rails_helper'

RSpec.describe Answer::AnswerCreator do
  describe '#call' do
    let!(:user_teacher) { create(:user_teacher) }
    let!(:user_student) { create(:user_student) }
    let!(:survey) { create(:survey, user: user_teacher) }
    let!(:question) { create(:multiple_choice_question, user: user_teacher, survey: survey) }
    let!(:another_question) { create(:single_choice_question, user: user_teacher, survey: survey) }
    let!(:answers_survey) { create(:answers_survey, user: user_student, survey: survey) }
    let!(:option_a) { create(:option, user: user_teacher, question: question) }
    let!(:option_b) { create(:option, user: user_teacher, question: question) }
    let!(:option_c) { create(:option, user: user_teacher, question: another_question) }
    let!(:option_d) { create(:option, user: user_teacher, question: another_question) }

    context 'when the params are correct' do
      let(:option_ids) { [option_a.id, option_b.id] }
      before do
        Answer::AnswerCreator.call(
          answer_params: { question_id: question.id, answers_survey_id: answers_survey.id },
          option_ids: option_ids,
          user: user_student
        )
      end

      it { expect(Answer.count).to eq 1 }

      it { expect(Answer.first.question_id).to eq question.id }

      it { expect(Answer.first.option_ids).to eq option_ids }

      context 'when already have answer created' do
        before do
          Answer::AnswerCreator.call(
            answer_params: { question_id: another_question.id, answers_survey_id: answers_survey.id },
            option_ids: [option_c.id],
            user: user_student
          )
        end

        it { expect(Answer.count).to eq 2 }

        it { expect(Answer.second.question_id).to eq another_question.id }

        it { expect(Answer.second.option_ids).to eq [option_c.id] }
      end
    end

    context 'when the params are no correct' do
      let(:question_id) { question.id }
      let(:answers_survey_id) { answers_survey.id }
      let(:answer_params) { { question_id: question_id, answers_survey_id: answers_survey_id } }
      let(:option_ids) { [option_a.id, option_b.id] }
      let(:user) { user_teacher }

      context 'when the user is nil' do
        it 'raise Pundit::NotAuthorizedError' do
          expect {
            Answer::AnswerCreator.call(
              answer_params: answer_params,
              option_ids: option_ids,
              user: nil
            )
          }.to raise_error Pundit::NotAuthorizedError
        end
      end

      context 'when the option_ids is nil' do
        it 'raise ActiveRecord::RecordInvalid' do
          expect {
            Answer::AnswerCreator.call(
              answer_params: answer_params,
              option_ids: nil,
              user: user_teacher
            )
          }.to raise_error ActiveRecord::RecordInvalid
        end
      end

      context 'when the answer_params is nil' do
        it 'raise ActiveRecord::RecordInvalid' do
          expect {
            Answer::AnswerCreator.call(
              answer_params: nil,
              option_ids: option_ids,
              user: user_teacher
            )
          }.to raise_error ActiveRecord::RecordInvalid
        end
      end

      context 'when the question_id is nil' do
        it 'raise ActiveRecord::RecordInvalid' do
          expect {
            Answer::AnswerCreator.call(
              answer_params: { question_id: nil, answers_survey_id: answers_survey_id } ,
              option_ids: option_ids,
              user: user_teacher
            )
          }.to raise_error ActiveRecord::RecordInvalid
        end
      end

      context 'when the answers_survey_id is nil' do
        it 'raise ActiveRecord::RecordInvalid' do
          expect {
            Answer::AnswerCreator.call(
              answer_params: { question_id: question_id, answers_survey_id: nil } ,
              option_ids: option_ids,
              user: user_teacher
            )
          }.to raise_error ActiveRecord::RecordInvalid
        end
      end
    end
  end
end
