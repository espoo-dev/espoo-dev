require 'rails_helper'

RSpec.describe Slim do
  it 'does not alow html.erb files to exist, they should be .slim' do
    html_erb_files = Dir['/app/views/**/*.html.erb']
    expect(html_erb_files.count).to be_zero
  end
end
