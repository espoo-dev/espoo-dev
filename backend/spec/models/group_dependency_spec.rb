require 'rails_helper'

RSpec.describe GroupDependency, type: :model do
  describe 'relationships' do
    it { is_expected.to belong_to(:group).required }
    # it { is_expected.to have_many(:groups).required }
  end
end
