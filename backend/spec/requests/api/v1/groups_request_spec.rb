require 'rails_helper'

RSpec.describe 'GroupsController', type: :request do
  describe '#index' do
    context 'when it has a group' do
      let!(:group) { create(:group_with_1_survey) }
      let!(:user) { group.surveys.first.answers_surveys.first.user }

      before { get api_v1_groups_path, headers: auth_headers(user: user) }

      it { expect(response).to have_http_status :ok }

      it { expect(response_body.count).to eq(1) }

      it 'matches group attributes' do
        group_payload = GroupPresenter.new(group, user).payload.with_indifferent_access

        expect(response_body).to match([group_payload])
      end
    end
  end
end
