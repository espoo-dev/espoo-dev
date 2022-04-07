# == Schema Information
#
# Table name: group_dependencies
#
#  id         :bigint           not null, primary key
#  group_id   :bigint           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
require 'rails_helper'

RSpec.describe GroupDependency, type: :model do
  describe 'relationships' do
    it { is_expected.to belong_to(:group).required }
    it { is_expected.to have_many(:groups).dependent(:nullify) }
  end
end
