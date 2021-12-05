require 'rails_helper'

RSpec.describe 'UsersController', type: :request do
  describe '#create' do
    context 'when data is valid' do
      let(:user) { build(:user) }
      let(:role_moderator) { create(:role_moderator) }

      before do
        user_params = {
          email: user.email,
          role_id: role_moderator.id,
          password: '123456'
        }
        post api_v1_users_path, params: user_params
      end

      it { expect(response).to have_http_status :created }

      it { expect(User.count).to eq(1) }

      it 'matches user attributes' do
        expected_attributes = {
          'id' => anything,
          'email' => user.email,
          'role' => {
            'id' => role_moderator.id,
            'role_type' => role_moderator.role_type
          },
          'surveys' => []
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
        let(:role_admin) { Role.find_by(role_type: Role::ADMIN) || create(:role_admin) }

        before do
          user_params = {
            'email' => user.email,
            'role_id' => role_admin.id
          }

          post api_v1_users_path, params: user_params
        end

        it { expect(response).to have_http_status :unauthorized }

        it { expect(User.count).to eq(0) }

        it { expect(response_body).to match({ 'error_message' => 'not allowed to create? this User' }) }
      end

      context 'when user email already exists' do
        let(:user_teacher) { create(:user_teacher) }

        before do
          user_params = {
            'email' => user_teacher.email,
            'role_id' => user_teacher.role.id
          }

          post api_v1_users_path, params: user_params
        end

        it { expect(response).to have_http_status :unprocessable_entity }

        it { expect(User.count).to eq(1) }

        it { expect(response_body).to match({ 'error_message' => "Validation failed: Email has already been taken, Password can't be blank" }) }
      end
    end
  end

  describe '#list' do
    describe 'when has no headers' do
      before do
        create(:user)
        get api_v1_users_path
      end

      it { expect(response).to have_http_status :found }
    end

    describe 'when user has survey' do
      let!(:user_with_surveys) { create(:user_with_surveys) }
      let!(:role) { user_with_surveys.role }

      let!(:survey) { user_with_surveys.surveys.first }

      before do
        get api_v1_users_path, headers: auth_headers
      end

      it 'has user with surveys' do
        user = response_body[0]
        expected_attributes = {
          'id' => user_with_surveys.id,
          'email' => user_with_surveys.email,
          'role' => {
            'id' => role.id,
            'role_type' => role.role_type
          },
          'surveys' => [
            {
              'id' => survey.id,
              'name' => survey.name,
              'description' => survey.description,
              'total_questions_quantity' => survey.questions.size,
              'answered_questions_quantity' => survey.last_answers_quantity
            }
          ]
        }
        expect(user).to match(expected_attributes)
      end
    end

    describe 'when has params role' do
      context 'when users exist' do
        let!(:user_teacher) { create(:user_teacher) }
        let!(:role) { user_teacher.role }

        before do
          create(:user)
          create(:user_moderator)
          get api_v1_users_path(role: 'teacher'), headers: auth_headers
        end

        it { expect(response).to have_http_status :success }

        it 'has user with role teacher' do
          teacher = response_body[0]
          expected_attributes = {
            'id' => user_teacher.id,
            'email' => user_teacher.email,
            'role' => {
              'id' => role.id,
              'role_type' => role.role_type
            },
            'surveys' => []
          }
          expect(teacher).to match(expected_attributes)
        end
      end

      context 'when users do not exist by role_id' do
        before do
          create(:user)
          role = create(:role, role_type: 'test')
          get api_v1_users_path(role_id: role.id), headers: auth_headers
        end

        it { expect(response).to have_http_status :success }

        it { expect(response_body).to match([]) }

        it { expect(response_body.count).to eq(0) }
      end
    end

    context 'when has no params' do
      before do
        create_list(:user, 5)
        get api_v1_users_path, headers: auth_headers
      end

      it { expect(response).to have_http_status :success }

      it { expect(response_body.count).to eq(6) }
    end
  end
end
