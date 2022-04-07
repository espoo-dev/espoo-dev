# == Schema Information
#
# Table name: survey_subjects
#
#  id          :bigint           not null, primary key
#  name        :string
#  description :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
FactoryBot.define do
  factory :survey_subject do
    name { Faker::Name.unique.name }
    description { Faker::Name.unique.name }
  end
end
