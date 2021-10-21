require 'rails_helper'

RSpec.describe ApplicationHelper, type: :helper do
  describe '#student_role' do
    it 'returns nil' do
      expect(helper.student_role).to be_nil
    end

    it 'returns student role' do
      role = create(:role_student)
      expect(helper.student_role.id).to be(role.id)
    end
  end

  describe '#teacher_role' do
    it 'returns nil' do
      expect(helper.teacher_role).to be_nil
    end

    it 'returns teacher role' do
      role = create(:role_teacher)
      expect(helper.teacher_role.id).to be(role.id)
    end
  end
end
