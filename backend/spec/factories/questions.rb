FactoryBot.define do
  factory :question do
    name { Faker::Name.unique.name }
  end
end
