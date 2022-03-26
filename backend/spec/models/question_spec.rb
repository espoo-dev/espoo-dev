require 'rails_helper'

RSpec.describe Question, type: :model do
  let!(:user_admin) { create(:user) }
  let!(:user_teacher) { create(:user_teacher) }
  let!(:user_moderator) { create(:user_moderator) }
  let!(:question) { create(:question) }
  let!(:question_teacher) { create(:question, user: user_teacher) }
  let!(:question_multiple) { create(:multiple_choice_question) }
  let!(:question_single) { create(:single_choice_question) }
  let!(:question_type_single) { create(:question_type_single) }

  it { expect(question).to be_valid }

  describe 'relationship' do
    it { is_expected.to belong_to(:question_type).required }
    it { is_expected.to belong_to(:survey).optional }
    it { is_expected.to belong_to(:user).required }
    it { is_expected.to have_many(:options).dependent(:destroy) }
    it { is_expected.to have_many(:answers).dependent(:destroy) }
  end

  describe 'presence' do
    it { is_expected.to validate_presence_of(:name) }
  end

  describe 'when updating to single choice with multiple correct options.' do
    before do
      create_list(:option, 3, correct: true, question_id: question_multiple.id)
      question_multiple.update(question_type_id: question_type_single.id)
    end

    it { expect(question_multiple).not_to be_valid }
    it { expect(question_multiple.errors.full_messages).to match(["Question type Can't change to single choice when having more than one correct option."]) }
  end

  describe '#single_choice?' do
    it { expect(question_single.single_choice?).to be(true) }
    it { expect(question_multiple.single_choice?).to be(false) }
  end

  describe 'uniqueness by user' do
    it { is_expected.to validate_uniqueness_of(:name).scoped_to(:user_id) }
  end

  describe '.by_user' do
    it { expect(described_class.by_user(user_teacher)).to eq([question_teacher]) }
    it { expect(described_class.by_user(user_admin)).to include(question_single, question, question_multiple, question_teacher) }
    it { expect(described_class.by_user(user_moderator)).to eq([]) }
  end

  describe '.answered_by_answers_survey' do
    let!(:answers_survey) { create(:answers_survey_with_some_answers) }
    let!(:answered_question) { answers_survey.answers.first.question }

    it { expect(described_class.answered_by_answers_survey(answers_survey)).to eq([answered_question]) }
  end

  describe '#validates_ready' do
    it 'has no correct options' do
      expect(question.update(ready_to_be_answered: true)).to be(false)
    end

    it 'has correct options' do
      create(:correct_option, question: question)
      expect(question.update(ready_to_be_answered: true)).to be(true)
    end
  end

  describe '#validates_ready_survey' do
    let!(:survey) { create(:ready_survey) }

    it 'is not valid when update ready to be answered when survey is ready' do
      question = survey.questions.first
      question.ready_to_be_answered = false
      expect(question).not_to be_valid
    end

    it 'does not update ready to be answered when survey is ready' do
      question = survey.questions.first
      question.ready_to_be_answered = false
      question.valid?
      expect(question.errors.full_messages).to match(['Ready to be answered Has to be "ready to be answered" when survey is ready.'])
    end
  end

  describe 'validate survey same user' do
    it 'is valid when question and survey have the same user' do
      survey_teacher = create(:survey_with_1_question, user: user_teacher)
      question = create(:question, user: user_teacher, survey: survey_teacher)

      expect(question).to be_valid
    end

    it 'is not valid when question and survey have different user' do
      survey_teacher = create(:survey_with_1_question, user: user_teacher)
      question_mod = build(:question, user: user_moderator, survey: survey_teacher)

      expect(question_mod).not_to be_valid
      expect(question_mod.errors.full_messages).to match(['User must be the same in question and survey'])
    end
  end

  describe 'validate image_url' do
    let!(:question) { create(:question) }

    it 'is valid when image_url is an empty string' do
      question.image_url = ''
      expect(question.valid?).to be true
    end

    it 'is valid when image_url is an url http' do
      question.image_url = 'http://www.example.com'
      expect(question.valid?).to be true
    end

    it 'is valid when image_url is an url https' do
      question.image_url = 'https://www.example.com'
      expect(question.valid?).to be true
    end

    it 'is valid when image_url has prefix' do
      question.image_url = 'https://www.example.com/user'
      expect(question.valid?).to be true
    end

    it 'is invalid when image_url does not have a protocol' do
      question.image_url = 'www.example.com'
      expect(question.valid?).to be false
    end

    it 'is invalid when image_url has an error' do
      question.image_url = 'www.example. com'
      expect(question.valid?).to be false
    end

    it 'is invalid when image_url has a www error' do
      question.image_url = 'ww.example.com'
      expect(question.valid?).to be false
    end

    it 'is invalid when image_url do not have a second-level domain' do
      question.image_url = 'www.example'
      expect(question.valid?).to be false
    end
  end
end
