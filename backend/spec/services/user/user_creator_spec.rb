require 'rails_helper'

RSpec.describe User::UserCreator do
  describe '#create' do
    context 'when data is valid' do
      let(:user) { build(:user) }

      it { expect(user).to be_valid }
    end

    context 'when data is not valid' do
      context 'when email is empty' do
        let(:user) { build(:user, email: '') }

        it { expect(user).to be_invalid }
      end
    end
  end
end
