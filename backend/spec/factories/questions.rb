FactoryBot.define do
  factory :survey do
    name { Faker::Name.unique.name }
    description { Faker::Name.unique.name }
    association :user
  end
end
