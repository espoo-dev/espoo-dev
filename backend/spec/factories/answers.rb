FactoryBot.define do
  factory :answer do
    association  :answers_survey
    association  :question
    association  :option
  end
end
