require 'rails_helper'

RSpec.describe Option, type: :model do
<<<<<<< HEAD
  let(:option) { create(:option) }

  it { expect(option).to be_valid }

  describe 'presence' do
    it { is_expected.to validate_presence_of(:option_type) }
  end
=======
  pending "add some examples to (or delete) #{__FILE__}"
>>>>>>> 2aab2dc (Add option model and updated ERD)
end
