require 'rails_helper'

RSpec.describe ApplicationDashboard do
  describe 'validate fields presence' do
    # rubocop:disable Rails/FilePath
    # rubocop:disable Performance/MethodObjectAsBlock
    before do
      Dir.glob("#{Rails.root.join('app', 'fields')}/**/*.rb").each(&method(:require_dependency))
      Dir.glob("#{Rails.root.join('app', 'dashboards')}/**/*.rb").each(&method(:require_dependency))
    end
    # rubocop:enable Rails/FilePath
    # rubocop:enable Performance/MethodObjectAsBlock

    it 'does not have ID for index' do
      described_class.descendants.each do |descendent|
        expect(descendent::COLLECTION_ATTRIBUTES).not_to include(:id), "id found for #{descendent}"
      end
    end

    it 'does not have CREATED_AT for index' do
      described_class.descendants.each do |descendent|
        expect(descendent::COLLECTION_ATTRIBUTES).not_to include(:created_at), "created_at found for #{descendent}"
      end
    end
  end
end
