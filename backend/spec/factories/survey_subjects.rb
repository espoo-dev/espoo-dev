FactoryBot.define do
  factory :survey_subject do
    name { Faker::Name.unique.name }
    description { Faker::Name.unique.name }
    initialize_with { SurveySubject.find_or_create_by(name: 'Animals') }
  end
end
