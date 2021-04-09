require 'rails_helper'

RSpec.describe 'QuestionsController', type: :request do
  describe '#create' do
    context 'when data is valid' do
      let(:question) { build(:question) }

      before do
        question_params = question.attributes

        post questions_path, params: question_params, headers: auth_headers
      end

      it { expect(response).to have_http_status :created }

      it { expect(Question.count).to eq(1) }

      it 'matches question attributes' do
        expected_attributes = {
          'id' => anything,
          'name' => question.name
        }
        expect(response_body).to match(expected_attributes)
      end

      it 'returns id as integer' do
        expect(response_body['id'].to_i).to be_a(Integer)
      end
    end

    context 'when data is not valid' do
      let(:question) { build(:question, name: '') }

      before do
        question_params = question.attributes

        post questions_path, params: question_params, headers: auth_headers
      end

      it { expect(response).to have_http_status :unprocessable_entity }

      it { expect(Question.count).to eq(0) }

      it { expect(response_body).to match({ 'error_message' => "Validation failed: Name can't be blank" }) }
    end
  end
end
