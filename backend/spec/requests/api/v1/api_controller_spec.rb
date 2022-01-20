require 'rails_helper'

RSpec.describe 'ApiController', type: :request do
  describe '#seed_database' do
    subject(:seed_call) { get '/api/v1/seed_database' }

    before do
      allow(Seeds).to receive(:call)
    end

    context 'when in production' do
      before do
        allow(Rails.env).to receive(:production?).and_return(true)
        seed_call
      end

      it 'returns status unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end

      it "returns a funny message saying 'Oops not in production'" do
        expect(response_body).to include('message' => 'Oops not in production :(')
      end
    end

    it 'calls the Seed service' do
      seed_call

      expect(Seeds).to have_received(:call)
    end

    it 'returns status ok' do
      seed_call

      expect(response).to have_http_status(:ok)
    end

    it 'returns a funny message saying uhu' do
      seed_call

      expect(response_body).to include('message' => 'uhu :)')
    end
  end
end
