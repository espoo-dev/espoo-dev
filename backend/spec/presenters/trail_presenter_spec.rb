# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TrailPresenter do
  subject(:presenter) { described_class.new(trail, user) }

  let!(:trail) { create(:trail) }
  let!(:user) { trail.user }

  describe '#payload' do
    it 'matches expected attributes' do
      expected_payload = {
        'id' => trail.id,
        'name' => trail.name,
        'groups' => [],
      }.with_indifferent_access

      expect(presenter.payload.with_indifferent_access).to eq expected_payload
    end
  end
end
