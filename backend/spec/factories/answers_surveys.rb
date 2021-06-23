FactoryBot.define do
  factory :answers_survey do
    association :user
    association :survey
  end
end
