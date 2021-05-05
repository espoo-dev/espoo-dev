FactoryBot.define do
  factory :option do
<<<<<<< HEAD
    option_type { 'option 1' }
    association :question
=======
    option_type { "MyString" }
    question { nil }
>>>>>>> 2aab2dc (Add option model and updated ERD)
  end
end
