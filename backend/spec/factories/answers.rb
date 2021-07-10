FactoryBot.define do
  factory :answer do
    association  :answers_survey
    association  :question
  end
end
