# == Schema Information
#
# Table name: answers
#
#  id                :bigint           not null, primary key
#  question_id       :bigint           not null
#  answers_survey_id :bigint           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  user_answer       :string
#
FactoryBot.define do
  factory :answer do
    association  :answers_survey
    association  :question
  end

  factory :free_text_answer, parent: :answer do
    question { create(:free_text_question) }
  end

  factory :answer_with_option, parent: :answer do
    question { create(:single_choice_question) }

    before(:create) do |answer|
      answer.options.push(create(:option, question: answer.question, user: answer.answers_survey.user))
      answer.save!
      answer.reload
    end
  end

  factory :answer_with_multiplt_options, parent: :answer do
    question { create(:multiple_choice_question) }

    before(:create) do |answer|
      answer.options.push(create(:option, question: answer.question, user: answer.answers_survey.user))
      answer.options.push(create(:option, question: answer.question, user: answer.answers_survey.user))
      answer.save!
      answer.reload
    end
  end
end
