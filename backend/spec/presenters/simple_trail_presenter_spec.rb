# frozen_string_literal: true

require 'rails_helper'

RSpec.describe SimpleTrailPresenter do
  subject(:presenter) { described_class.new(trail, user) }

  let!(:trail) { create(:trail_with_2_groups) }
  let!(:user) { trail.user }

  describe '#payload' do
    it 'matches expected attributes' do
      expected_payload = {
        'id' => trail.id,
        'name' => trail.name,
        'surveys_quantity' => 2
      }.with_indifferent_access

      expect(presenter.payload.with_indifferent_access).to eq expected_payload
    end
  end
end
