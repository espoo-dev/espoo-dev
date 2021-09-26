require 'rails_helper'

RSpec.describe 'Routes' do
  it 'has expected routes amount' do
    expect(Rails.application.routes.routes.size).to eq(83)
  end
end
