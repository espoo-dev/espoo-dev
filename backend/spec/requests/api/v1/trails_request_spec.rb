require 'rails_helper'

RSpec.describe 'TrailsController', type: :request do
  describe '#index' do
    context 'when it has a trail' do
      let!(:trail) { create(:trail, groups: [create(:group_with_1_survey)], user: create(:user_student)) }
      let!(:user) { trail.user }

      before { get api_v1_trails_path, headers: auth_headers(user: user) }

      it { expect(response).to have_http_status :ok }

      it { expect(response_body.count).to eq(1) }

      it 'matches trail attributes' do
        trail_payload = TrailPresenter.new(trail, user).payload.with_indifferent_access
        expect(response_body).to match([trail_payload])
      end
    end
  end
end
