FactoryBot.define do
  factory :survey_subject do
    name { 'Animals' }
    description { 'All surveys have questions related to animals.' }
    initialize_with { SurveySubject.find_or_create_by(name: 'Animals') }
  end
end
