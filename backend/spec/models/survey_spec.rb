require 'rails_helper'

RSpec.describe Survey, type: :model do
  describe 'relationships' do
    it { is_expected.to belong_to(:user).required }
    it { is_expected.to have_many(:questions) }
  end

  describe '.by_user' do
    let!(:admin) { create(:user) }
    let!(:teacher) { create(:user_teacher) }
    let!(:moderator) { create(:user_moderator) }
    let!(:survey_teacher) { create(:survey, user_id: teacher.id) }
    let!(:survey_admin) { create(:survey, user_id: admin.id) }

    it { expect(described_class.by_user(teacher)).to eq([survey_teacher]) }
    it { expect(described_class.by_user(admin)).to eq([survey_teacher, survey_admin]) }
    it { expect(described_class.by_user(moderator)).to eq([]) }
  end
end
