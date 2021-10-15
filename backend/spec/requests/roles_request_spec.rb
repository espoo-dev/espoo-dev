require 'rails_helper'

RSpec.describe 'RolesController', type: :request do
  describe '#list' do
    let!(:role_moderator) { create(:role_moderator) }
    let!(:role_teacher) { create(:role_teacher) }
    let!(:role_student) { create(:role_student) }
    let!(:role_admin) { create(:role_admin) }
    let!(:not_admin_roles) do
      [{ 'id' => role_moderator.id, 'role_type' => role_moderator.role_type },
       { 'id' => role_teacher.id, 'role_type' => role_teacher.role_type }, { 'id' => role_student.id, 'role_type' => role_student.role_type }]
    end
    let!(:all_roles) { [*not_admin_roles, { 'id' => role_admin.id, 'role_type' => role_admin.role_type }] }
    let(:user_admin) { create(:user) }
    let(:user_student) { create(:user_student) }

    describe 'when admin, list all roles' do
      before do
        get api_v1_roles_path, headers: auth_headers(user: user_admin)
      end

      it { expect(response).to have_http_status :ok }

      it { expect(response_body).to match(all_roles) }
    end

    describe 'when user is not logged, list all not admin roles' do
      before do
        get api_v1_roles_path
      end

      it { expect(response).to have_http_status :ok }

      it { expect(response_body).to match(not_admin_roles) }

      it 'does not show admin role' do
        expect(response_body).not_to include({ 'id' => role_admin.id, 'role_type' => role_admin.role_type })
      end
    end

    describe 'when user is not admin, list all not admin roles' do
      before do
        get api_v1_roles_path, headers: auth_headers(user: user_student)
      end

      it { expect(response).to have_http_status :ok }

      it { expect(response_body).to match(not_admin_roles) }

      it 'does not show admin role' do
        expect(response_body).not_to include({ 'id' => role_admin.id, 'role_type' => role_admin.role_type })
      end
    end
  end
end
