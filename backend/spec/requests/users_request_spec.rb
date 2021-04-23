require 'rails_helper'

RSpec.describe 'UsersController', type: :request do
  describe '#create' do
    context 'when data is valid' do
      let(:user) { build(:user) }

      before do
        user_params = {
          email: user.email,
          role: 'moderator',
          password: '123456'
        }
        post users_path, params: user_params
      end

      it { expect(response).to have_http_status :created }

      it { expect(User.count).to eq(1) }

      it 'matches user attributes' do
        expected_attributes = {
          'id' => anything,
          'email' => user.email,
          'role' => 'moderator'
        }
        expect(response_body).to match(expected_attributes)
      end

      it 'returns id as integer' do
        expect(response_body['id'].to_i).to be_a(Integer)
      end
    end

    context 'when data is not valid' do
      let(:user) { build(:user, email: '') }

      before do
        user_params = {
          'id' => anything,
          'email' => user.email,
          'role' => 'admin'
        }

        post users_path, params: user_params
      end

      it { expect(response).to have_http_status :unauthorized }

      it { expect(User.count).to eq(0) }

      it { expect(response_body).to match({ 'error_message' => "Can't create admin user :(" }) }
    end
  end

  describe 'list users with role teacher' do
    context 'when can list the record' do
      let!(:user_teacher) { create(:user_teacher) }
      let(:user) { create(:user) }
      let(:user_moderator) { create(:user_moderator) }

      before do
        get '/api/v1/users?role=teacher', headers: auth_headers
      end

      it { expect(response).to have_http_status :success }

      it 'have user with role teacher' do
        teacher = response_body[0]
        expected_attributes = {
          'id' => user_teacher.id,
          'email' => user_teacher.email,
          'role' => user_teacher.role
        }
        expect(teacher).to match(expected_attributes)
      end
    end

    context 'when cannot find any teacher' do
      before do
        create(:user)
        get '/api/v1/users?role=teacher', headers: auth_headers
      end

      it { expect(response).to have_http_status :success }

      it { expect(response.body).to match('[]') }
      it { expect(response_body.count).to eq(0) }
    end
  end

  context 'without params' do
    before do
      create_list(:user, 5)
      get '/api/v1/users', headers: auth_headers
    end

    it { expect(response).to have_http_status :success }

    it { expect(response_body.count).to eq(6) }
  end
end
