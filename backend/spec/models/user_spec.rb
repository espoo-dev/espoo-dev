require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { create(:user) }
  let(:user_teacher) { create(:user_teacher) }

  it { expect(user).to be_admin }

  it { expect(user).to be_valid }

  describe 'relationships' do
    %i[surveys questions options answers_surveys groups trails].each do |sym|
      it { is_expected.to have_many(sym).dependent(:destroy) }
    end

    it { is_expected.to belong_to(:role) }
  end
end
