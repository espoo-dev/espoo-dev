require 'rails_helper'

RSpec.describe Answer::AnswerCreator do
  describe '#call' do
    subject(:creator_call) do
      described_class.call(
        answer_params: answer_params,
        option_ids: option_ids,
        user: user
      )
    end

    let!(:user_teacher) { create(:user_teacher) }
    let!(:user_student) { create(:user_student) }
    let!(:survey) { create(:survey, user: user_teacher) }
    let!(:question) { create(:multiple_choice_question, user: user_teacher, survey: survey) }
    let!(:answers_survey) { create(:answers_survey, user: user_student, survey: survey) }
    let!(:option_a) { create(:option, user: user_teacher, question: question) }
    let!(:option_b) { create(:option, user: user_teacher, question: question) }

    let(:question_id) { question.id }
    let(:answers_survey_id) { answers_survey.id }
    let(:answer_params) { { question_id: question_id, answers_survey_id: answers_survey_id } }
    let(:option_ids) { [option_a.id, option_b.id] }
    let(:user) { user_student }

    context 'when the params are correct' do
      it { is_expected.to be_a Answer }

      it { expect { creator_call }.to change(Answer, :count).from(0).to(1) }

      it { expect(creator_call.answers_survey_id).to eq(answers_survey_id) }

      it { expect(creator_call.question_id).to eq(question_id) }

      it { expect(creator_call.option_ids).to match_array(option_ids) }
    end

    context 'when the params are not correct' do
      shared_examples 'raise error' do |param_name, error_class|
        context "when #{param_name} is nil" do
          it { expect { creator_call }.to raise_error(error_class) }
        end
      end

      it_behaves_like 'raise error', 'user', Pundit::NotAuthorizedError do
        let(:user) { nil }
      end

      it_behaves_like 'raise error', 'option_ids', ActiveRecord::RecordInvalid do
        let(:option_ids) { nil }
      end

      it_behaves_like 'raise error', 'answer_params', ActiveRecord::RecordInvalid do
        let(:answer_params) { nil }
      end

      it_behaves_like 'raise error', 'question_id', ActiveRecord::RecordInvalid do
        let(:question_id) { nil }
      end

      it_behaves_like 'raise error', 'answers_survey_id', ActiveRecord::RecordInvalid do
        let(:answers_survey_id) { nil }
      end
    end
  end
end
