require 'rails_helper'

RSpec.describe Survey, type: :model do
  describe 'relationships' do
    it { is_expected.to belong_to(:user).required }
    it { is_expected.to belong_to(:survey_subject).required }
    it { is_expected.to have_many(:questions).dependent(:nullify) }
    it { is_expected.to have_many(:answers_surveys).dependent(:destroy) }
  end

  describe '.by_user' do
    let!(:admin) { create(:user) }
    let!(:teacher) { create(:user_teacher) }
    let!(:moderator) { create(:user_moderator) }
    let!(:survey_teacher) { create(:survey_with_1_question, user_id: teacher.id) }
    let!(:survey_admin) { create(:survey_with_1_question, user_id: admin.id) }

    it { expect(described_class.by_user(teacher)).to eq([survey_teacher]) }
    it { expect(described_class.by_user(admin)).to eq([survey_teacher, survey_admin]) }
    it { expect(described_class.by_user(moderator)).to eq([]) }
  end

  describe '.ready_surveys' do
    it 'only shows ready surveys' do
      create(:ready_survey)
      create_list(:survey, 3)
      expect(described_class.ready_surveys.count).to eq(1)
    end
  end

  describe '#validates_ready' do
    let!(:survey) { create(:not_ready_survey) }

    it "can't update ready if not all questions are ready" do
      survey.ready = true
      expect(survey).not_to be_valid
    end

    it 'Shows the correct error if not all questions are ready' do
      survey.ready = true
      survey.valid?
      expect(survey.errors.full_messages).to match(['Ready All questions need to be ready to be answered before you can make the survey ready.'])
    end

    it 'can update ready when all questions are ready' do
      not_ready_question = survey.questions.find_by(ready_to_be_answered: false)
      not_ready_question.ready_to_be_answered = true
      not_ready_question.save!
      survey.reload.ready = true
      expect(survey).to be_valid
    end
  end
end
