# frozen_string_literal: true

require 'rails_helper'

RSpec.describe BasePresenter do
  subject(:presenter) { described_class.new }

  it { expect(described_class).to respond_to(:payload).with(1).arguments }

  it { expect(presenter).to respond_to(:payload).with(0).arguments }

  it { expect { presenter.payload }.to raise_exception(NotImplementedError) }
end
