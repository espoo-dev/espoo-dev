require 'rails_helper'

RSpec.describe 'Survey CRUD', type: :system do
  describe 'CRUD' do
    let!(:user_student) { create(:user_student) }
    let!(:survey) { create(:survey_with_answer, user: user_student) }

    describe '#index' do
      before do
        sign_in user_student
        visit surveys_path
      end

      it { expect(page).to have_text(survey.name) }

      it { expect(page).to have_text('1 question answered') }
    end
  end
end
