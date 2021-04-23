require 'rails_helper'

RSpec.describe 'UsersController', type: :request do
  include JsonResponseHelper
  describe 'list users with role teacher' do
    context 'when can list the record' do
      let!(:user_teacher) { create(:teacher) }
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
          'phone' => user_teacher.phone,
          'role' => user_teacher.role
        }
        expect(teacher).to match(expected_attributes)
      end
    end

    context 'when cannot find any teacher' do
      let(:user) { create(:user) }

      before do
        get '/api/v1/users?role=teacher', headers: auth_headers
      end

      it { expect(response).to have_http_status :success }

      it { expect(response.body).to match('[]') }
      it { expect(response_body.count).to eq(0) }
    end
  end

  describe 'List users' do
    context 'without params' do
      let!(:created_users) { create_list(:user, 5) }
      let!(:user_teacher) { create(:teacher) }

      before do
        get '/api/v1/users', headers: auth_headers
      end

      it { expect(response).to have_http_status :success }

      it { expect(response_body.count).to eq(7) }
    end
  end
end
