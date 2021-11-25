# frozen_string_literal: true
require 'rails_helper'

RSpec.describe SurveyWithAnsweredQuestionsPresenter do
  subject(:presenter) { described_class.new(survey, user) }

  let(:user) { create(:user) }
  let(:surveys) { create(:survey) }

  it { expect(SurveyWithAnsweredQuestionsPresenter).to respond_to(:payload).with(1).arguments }

  it { expect(presenter).to respond_to(:payload).with(0).arguments }

  it { expect { presenter.payload }.to raise_exception(NotImplementedError) }
end
