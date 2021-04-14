require 'rails_helper'

RSpec.describe 'UsersController', type: :request do
  include JsonResponseHelper
  describe 'list users with role teacher' do
    context 'when can list the record' do

      let!(:user) { create(:teacher) }
      let!(:user1) { create(:user) }
      let!(:user2) { create(:user_moderator) }
      
      before do
        get '/admin/teachers', params: user, headers: auth_headers
      end
      it { expect(response).to have_http_status :success }

      it { expect(user.role).to match('teacher') }

      it 'should have at least one teacher ' do
        teachers = User.where(role: 'teacher')
        expect(teachers.count).to eq(1)
      end
    end

    context 'when cannot find any teacher' do
      let!(:user) { create(:user) }

      before do
        get '/admin/teachers', params: user, headers: auth_headers
      end

      it { expect(response).to have_http_status :success }

      it { expect(response.body).to include {} }

      it 'when cannot find any record' do
        teachers = User.where(role: 'teacher')
        expect(teachers.count).to eq(0)
      end
    end
  end
end
