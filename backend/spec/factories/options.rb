# == Schema Information
#
# Table name: options
#
#  id          :bigint           not null, primary key
#  name        :string
#  question_id :bigint           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  user_id     :bigint           not null
#  correct     :boolean          default(FALSE)
#
FactoryBot.define do
  factory :option do
    sequence(:name) { |n| "Option #{n}" }
    association :question
    association :user
  end

  factory :correct_option, parent: :option do
    correct { true }
  end

  factory :free_text_option, parent: :correct_option do
    name { Faker::Name.unique.name }
  end
end
