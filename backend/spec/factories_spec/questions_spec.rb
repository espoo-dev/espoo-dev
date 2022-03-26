require 'rails_helper'

RSpec.describe 'Questions' do
  describe 'multiple_choice_ready_question' do
    before do
      create(:multiple_choice_ready_question)
    end

    [Question, Option].each do |model|
      it { expect(model.count).to eq(1) }
    end
  end
end
