require 'rails_helper'

RSpec.shared_examples 'url validation' do |field|
  it 'returns true' do
    ['', 'http://www.example.com', 'https://www.example.com', 'https://www.example.com/user'].each do |cases|
      object_instance[field] = cases

      expect(object_instance.valid?).to be true
    end
  end

  it 'returns false' do
    ['www.example.com', 'www.example. com', 'ww.example.com', 'www.example'].each do |cases|
      object_instance[field] = cases

      expect(object_instance.valid?).to be false
    end
  end
end
