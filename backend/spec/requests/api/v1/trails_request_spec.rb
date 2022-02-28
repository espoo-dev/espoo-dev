require 'rails_helper'

RSpec.describe 'TrailsController', type: :request do
  describe '#index' do
    context 'when it has a trail' do
      let!(:trail) { create(:trail_with_1_group, user: create(:user_student)) }

      let!(:user) { trail.user }

      before { get api_v1_trails_path, headers: auth_headers(user: user) }

      it { expect(response).to have_http_status :ok }

      it { expect(response_body.count).to eq(1) }

      it 'matches trail attributes' do
        trail_payload = SimpleTrailPresenter.new(trail, user).payload.with_indifferent_access
        expect(response_body).to match([trail_payload])
      end
    end

    context 'when run seed' do
      let(:user) { User.find_by(email: 'student@gmail.com') }

      before do
        Seeds.call
        get api_v1_trails_path, headers: auth_headers(user: user)
      end

      it { expect(response).to have_http_status :ok }
    end
  end

  describe '#show' do
    let!(:trail) { create(:trail, groups: [create(:group_with_1_survey)], user: create(:user_student)) }
    let!(:user) { trail.user }

    context 'when trail exists' do
      before { get api_v1_trail_path(trail), headers: auth_headers(user: user) }

      it { expect(response).to have_http_status :ok }

      it 'matches trail attributes' do
        trail_payload = TrailPresenter.new(trail, user).payload.with_indifferent_access
        expect(response_body).to match(trail_payload)
      end
    end

    context 'when trail does not exist' do
      before { get api_v1_trail_path(0), headers: auth_headers(user: user) }

      it { expect(response).to have_http_status :not_found }

      it { expect(response_body).to match({ 'error_message' => "Couldn't find Trail with [WHERE \"trails\".\"id\" = $1]" }) }
    end
  end
end
