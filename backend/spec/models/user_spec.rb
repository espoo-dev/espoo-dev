require 'rails_helper'

RSpec.describe User, type: :model do
  before do
    allow(SlackService).to receive(:call)
  end

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

  context 'when student user is created' do
    let(:user_student) { create(:user_student) }
    let(:message) do
      "New user with role #{user_student.role.role_type.humanize} created at #{user_student.created_at}. \n"\
        "There are 0 admins, 0 teachers and 1 students\nTotal users: 1\n"
    end

    it { expect(user_student).to be_valid }

    it 'send slack message' do
      expect(SlackService).to have_received(:call).with(message)
    end
  end
end
