FactoryBot.define do
  factory :survey_subject do
    name { Faker::Name.unique.name }
    description { Faker::Name.unique.name }
  end
end
