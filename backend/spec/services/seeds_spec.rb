# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Seeds do
  describe '#call' do
    describe 'when non production environment' do
      before { described_class.call }

      it 'creates 3 users' do
        expect(User.count).to eq(3)
      end

      it 'creates 3 roles' do
        expect(Role.count).to eq(3)
      end

      it 'creates 2 question types' do
        expect(QuestionType.count).to eq(2)
      end

      it 'creates 3 survey subjects' do
        expect(SurveySubject.count).to eq(3)
      end

      it 'creates 12 questions' do
        expect(Question.count).to eq(12)
      end

      it 'creates 7 surveys' do
        expect(Survey.count).to eq(7)
      end

      it 'creates 4 ready surveys' do
        expect(Survey.ready_surveys.count).to eq(4)
      end

      it 'creates 41 options' do
        expect(Option.count).to eq(41)
      end

      it 'creates 3 groups' do
        expect(Group.count).to eq(3)
      end

      it 'Groups have position 0,1,2' do
        expect(Group.all.map(&:position).sort).to eq([0, 1, 2])
      end

      it 'creates 1 trail' do
        expect(Trail.count).to eq(1)
      end

      it 'creates 1 trail with 3 groups' do
        expect(Trail.first.groups.count).to eq(3)
      end
    end

    describe 'when production environment' do
      before do
        allow(Rails.env).to receive(:production?).and_return(true)
        described_class.call
      end

      it 'do not create entities' do
        expect(User.count).to be_zero
      end
    end
  end
end
