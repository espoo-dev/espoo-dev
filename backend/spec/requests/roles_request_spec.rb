require 'rails_helper'

RSpec.describe 'RolesController', type: :request do
  describe '#list' do
    let!(:role) { create(:role) }

    before { get api_v1_roles_path }

    it { expect(response).to have_http_status :ok }

    it 'matches surveys attributes' do
      expect(response_body).to match([{ 'id' => role.id, 'role_type' => role.role_type }])
    end
  end
end
