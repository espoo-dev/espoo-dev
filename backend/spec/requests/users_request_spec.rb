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
      context 'when user role is admin' do
        let(:user) { build(:user, email: '') }

        before do
          user_params = {
            'email' => user.email,
            'role' => 'admin'
          }

          post users_path, params: user_params
        end

        it { expect(response).to have_http_status :unauthorized }

        it { expect(User.count).to eq(0) }

        it { expect(response_body).to match({ 'error_message' => "Can't create admin user :(" }) }
      end

      context 'when user email already exists' do
        let(:user_teacher) { create(:user_teacher) }

        before do
          user_params = {
            'email' => user_teacher.email,
            'role' => user_teacher.role
          }

          post users_path, params: user_params
        end

        it { expect(response).to have_http_status :unprocessable_entity }

        it { expect(User.count).to eq(1) }

        it { expect(response_body).to match({ 'error_message' => "Validation failed: Email has already been taken, Password can't be blank" }) }
      end
    end
  end

  describe '#list' do
    describe 'when has params role' do
      context 'when users exist' do
        let!(:user_teacher) { create(:user_teacher) }

        before do
          create(:user)
          create(:user_moderator)
          get '/api/v1/users?role=teacher', headers: auth_headers
        end

        it { expect(response).to have_http_status :success }

        it 'has user with role teacher' do
          teacher = response_body[0]
          expected_attributes = {
            'id' => user_teacher.id,
            'email' => user_teacher.email,
            'role' => user_teacher.role
          }
          expect(teacher).to match(expected_attributes)
        end
      end

      context 'when users do not exist' do
        before do
          create(:user)
          get '/api/v1/users?role=teacher', headers: auth_headers
        end

        it { expect(response).to have_http_status :success }

        it { expect(response.body).to match('[]') }

        it { expect(response_body.count).to eq(0) }
      end
    end

    context 'when has no params' do
      before do
        create_list(:user, 5)
        get '/api/v1/users', headers: auth_headers
      end

      it { expect(response).to have_http_status :success }

      it { expect(response_body.count).to eq(6) }
    end
  end
end
