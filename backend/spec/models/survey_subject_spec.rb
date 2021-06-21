require 'rails_helper'

RSpec.describe SurveySubject, type: :model do
  describe 'relationships' do
    it { is_expected.to have_many(:surveys).dependent(:destroy) }
  end

  describe 'presence' do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:description) }
  end

  describe '#destroy' do
    describe 'When there are surveys for survey subject' do
      let!(:survey_subject) { create(:survey).survey_subject }

      it 'does not destroy' do
        survey_subject.destroy
        expect(survey_subject.errors.full_messages.first).to match("Can't destroy survey subject with 1 surveys.")
      end

      it { expect(described_class.count).to eq(1) }
    end

    describe 'When there are no surveys for survey subject' do
      let!(:survey_subject) { create(:survey_subject) }

      it { expect(survey_subject.destroy).to be_truthy }

      it 'does not have any survey subject when delete survey subject' do
        survey_subject.destroy
        expect(described_class.count).to be_zero
      end
    end
  end
end
