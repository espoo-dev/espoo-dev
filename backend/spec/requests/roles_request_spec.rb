require 'rails_helper'

RSpec.describe 'RolesController', type: :request do
  describe '#list' do
    let!(:role_moderator) { create(:role_moderator) }
    let!(:role_admin) { create(:role_admin) }
    let!(:role_teacher) { create(:role_teacher) }
    let!(:role_student) { create(:role_student) }
    let(:user_admin) { create(:user) }

    describe 'List all roles when admin' do
      before do
        get api_v1_roles_path, headers: auth_headers(user: user_admin)
      end

      it { expect(response).to have_http_status :ok }

      it 'matches surveys attributes' do
        expect(response_body).to match([{ 'id' => role_moderator.id, 'role_type' => role_moderator.role_type }, { 'id' => role_admin.id, 'role_type' => role_admin.role_type },
                                        { 'id' => role_teacher.id, 'role_type' => role_teacher.role_type }, { 'id' => role_student.id, 'role_type' => role_student.role_type }])
      end
    end

    describe 'List all roles except admin when not logged in' do
      before do
        get api_v1_roles_path
      end

      it { expect(response).to have_http_status :ok }

      it 'matches surveys attributes' do
        expect(response_body).to match([{ 'id' => role_moderator.id, 'role_type' => role_moderator.role_type },
                                        { 'id' => role_teacher.id, 'role_type' => role_teacher.role_type }, { 'id' => role_student.id, 'role_type' => role_student.role_type }])
      end

      it 'does not show admin role' do
        expect(response_body).not_to include({ 'id' => role_admin.id, 'role_type' => role_admin.role_type })
      end
    end
  end
end
