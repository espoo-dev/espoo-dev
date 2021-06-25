require 'rails_helper'

RSpec.describe 'AnswersController', type: :request do
  describe '#create' do
    context 'when data is valid' do
      let(:survey) { create(:survey) }
      let!(:answers_survey) { create(:answers_survey) }
      let!(:question) { create(:question) }
      let!(:option_a) { create(:option) }
      let!(:option_b) { create(:option) }

      before do
        answer_params = {
          question_id: question.id,
          option_ids: [option_a.id, option_b.id],
          answers_survey_id: answers_survey.id
        }

        post api_v1_answers_path, params: answer_params, headers: auth_headers
      end

      it { expect(response).to have_http_status :created }

      it { expect(Answer.count).to eq(1) }

      it { expect(Answer.first.options.count).to eq(2) }

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
          'answers_survey_id' => answers_survey.id
        }
        expect(response_body).to match(expected_attributes)
      end
    end
  end
end
