# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Base do
  describe '#call' do
    subject(:service) { described_class.new.call }

    it 'raises a not implemented error' do
      expect { service }.to raise_error(::NotImplementedError)
    end
  end
end
