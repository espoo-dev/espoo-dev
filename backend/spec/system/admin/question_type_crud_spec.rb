require 'rails_helper'

RSpec.describe 'question_type CRUD', type: :system do
  describe 'CRUD' do
    let!(:question_type) { create(:question_type) }
    let!(:question_type_single) { create(:question_type_single) }
    let!(:admin_user) { create(:user) }

    describe 'when user is admin' do
      before do
        sign_in admin_user
        visit admin_question_types_path
      end

      it { expect(page).to have_text(question_type.name) }

      describe 'when delete' do
        it 'deletes question_type' do
          first(:link, 'Destroy').click
          page.accept_alert
          expect(page).to have_text('Question type was successfully destroyed.')
        end

        it 'does not delete question_type' do
          create(:question, question_type: question_type_single)
          all(:link, 'Destroy').last.click
          page.accept_alert
          expect(page).to have_text('Can\'t destroy question type with 1 questions')
        end
      end

      describe 'when create' do
        before do
          click_on 'New question type'
          fill_in 'Name', with: 'test type'
          click_button 'Create Question type'
        end

        it { expect(page).to have_text('Question type was successfully created.') }
      end

      describe 'when edit' do
        before do
          question_type = create(:question_type)
          visit edit_admin_question_type_path(question_type)
          click_button 'Update Question type'
        end

        it { expect(page).to have_text('Question type was successfully updated.') }
      end
    end
  end
end
