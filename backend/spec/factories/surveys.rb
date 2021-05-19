FactoryBot.define do
  factory :survey do
    name { Faker::Name.unique.name }
    description { Faker::Name.unique.name }
    association :user
    questions { build_list :question, 1 }
  end
end
