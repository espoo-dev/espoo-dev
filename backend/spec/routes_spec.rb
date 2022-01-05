require 'rails_helper'

RSpec.describe 'Routes', type: :routing do
  describe 'routable' do
    it { expect(get: '/surveys').to be_routable }
  end

  it 'has expected routes amount' do
    expect(Rails.application.routes.routes.size).to eq(88)
  end
end
