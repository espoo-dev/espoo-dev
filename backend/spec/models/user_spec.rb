# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  phone                  :string
#  reset_password_token   :string
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  role_id                :bigint           not null
#
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
