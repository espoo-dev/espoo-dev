# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Seeds do
  describe '#call' do
    context 'when non production environment' do
      before { described_class.call }

      context 'when creates 3 users' do
        it { expect(User.count).to eq(3) }
      end

      context 'when creates 3 roles' do
        it { expect(Role.count).to eq(3) }
      end

      context 'when creates 2 question types' do
        it { expect(QuestionType.count).to eq(2) }
      end

      context 'when creates 3 survey subjects' do
        it { expect(SurveySubject.count).to eq(3) }
      end

      context 'when creates 12 questions' do
        it { expect(Question.count).to eq(12) }
      end

      context 'when creates 7 surveys' do
        it { expect(Survey.count).to eq(7) }
      end

      context 'when creates 4 ready surveys' do
        it { expect(Survey.ready_surveys.count).to eq(4) }
      end

      context 'when creates 41 options' do
        it { expect(Option.count).to eq(41) }
      end

      context 'when creates 3 groups' do
        it { expect(Group.count).to eq(3) }
      end

      context 'when groups have position 0,1,2' do
        it { expect(Group.all.map(&:position).sort).to eq([0, 1, 2]) }
      end

      context 'when creates 1 trail' do
        it { expect(Trail.count).to eq(1) }
      end

      context 'when creates 1 trail with 3 groups' do
        it { expect(Trail.first.groups.count).to eq(3) }
      end
    end

    context 'when production environment' do
      before do
        allow(Rails.env).to receive(:production?).and_return(true)
        described_class.call
      end

      context 'when do not create entities' do
        it { expect(User.count).to be_zero }
      end
    end
  end

  describe '#clean_database' do
    before do
      described_class.call
      described_class.new.clean_database
    end

    it 'deletes all models from database' do
      Rails.application.eager_load!
      no_stored_records = ApplicationRecord.descendants.all? { |klass| klass.count.zero? }
      expect(no_stored_records).to be(true)
    end
  end
end
