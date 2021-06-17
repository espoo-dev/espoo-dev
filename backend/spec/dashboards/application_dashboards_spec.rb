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

    it 'does not have ID, updated_at or created_at for index' do
      attributes = %i[id updated_at created_at]
      described_class.descendants.each do |descendent|
        expect(descendent::COLLECTION_ATTRIBUTES).not_to include(*attributes), "#{descendent::COLLECTION_ATTRIBUTES.select do |attr|
                                                                                    attributes.include? attr
                                                                                  end } found for #{descendent}"
      end
    end
  end
end
