require 'rails_helper'

RSpec.shared_examples 'image_url validation' do
  it 'returns true' do
    ['', 'http://www.example.com', 'https://www.example.com', 'https://www.example.com/user'].each do |cases|
      tested_class.image_url = cases
      expect(tested_class.valid?).to be true
    
    end
  end

  it 'returns false' do
    ['www.example.com', 'www.example. com', 'ww.example.com', 'www.example'].each do |cases|
      tested_class.image_url = cases
      expect(tested_class.valid?).to be false
    end
  end
end