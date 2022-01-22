module HashHelper
  def self.included(base)
    base.class_eval do
      include HashHelperMethods
    end
  end

  def answers_survey_sym(answers_survey)
    survey = answers_survey.survey
    survey_question = survey.questions.first
    survey_question2 = survey.questions.second
    option = survey_question.options.first
    option3 = survey_question.options.second
    option2 = survey_question2.options.first
    question_type = survey_question.question_type

    answered_question_attributes = answered_question_attributes_sym(survey_question, question_type, [option, option3])

    unanswered_question_attributes = answered_question_attributes_sym(survey_question2, question_type, [option2])

    question_attributes = [
      answered_question_attributes,
      unanswered_question_attributes
    ]

    asnwers_survey_returned_params({ answers_survey: answers_survey, question_attributes: question_attributes, answered_question_attributes: answered_question_attributes,
                                     unanswered_question_attributes: unanswered_question_attributes }).transform_keys(&:to_sym)
  end

  def answers_survey_hash(answers_survey)
    survey = answers_survey.survey
    survey_question = survey.questions.first
    survey_question2 = survey.questions.second
    option = survey_question.options.first
    option3 = survey_question.options.second
    option2 = survey_question2.options.first
    question_type = survey_question.question_type

    answered_question_attributes = answers_survey_question_attributes_hash(survey_question, question_type, [option, option3])

    unanswered_question_attributes = answers_survey_question_attributes_hash(survey_question2, question_type, [option2])

    question_attributes = [
      answered_question_attributes,
      unanswered_question_attributes
    ]

    asnwers_survey_returned_params({ answers_survey: answers_survey, question_attributes: question_attributes, answered_question_attributes: answered_question_attributes,
                                     unanswered_question_attributes: unanswered_question_attributes })
  end

  def answered_question_hash(answers_survey)
    survey = answers_survey.survey
    survey_question = survey.questions.first
    option = survey_question.options.first
    option3 = survey_question.options.second
    question_type = survey_question.question_type

    {
      'id' => survey_question.id,
      'name' => survey_question.name,
      'question_type' => question_type(question_type),
      'options' => options_hash([option, option3]),
      'answered_options' => options_hash([option3]),
      'correct' => false
    }
  end

  def answers_survey_with_questions_hash(answers_survey)
    survey = answers_survey.survey
    survey_question = survey.questions.first
    survey_question2 = survey.questions.second
    option2 = survey_question2.options.first
    question_type = survey_question.question_type

    answered_question_attributes = answered_question_hash(answers_survey)

    unanswered_question_attributes = {
      'id' => survey_question2.id,
      'name' => survey_question2.name,
      'question_type' => question_type(question_type),
      'options' => options_hash([option2]),
      'answered_options' => [],
      'correct' => false
    }

    question_attributes = [
      answered_question_attributes,
      unanswered_question_attributes
    ]

    asnwers_survey_returned_params({ answers_survey: answers_survey, question_attributes: question_attributes, answered_question_attributes: answered_question_attributes,
                                     unanswered_question_attributes: unanswered_question_attributes })
  end

  def survey_hash(_survey, answers_survey)
    answers_survey_attributes = answers_survey_hash(answers_survey)

    {
      'questions' => answers_survey_attributes['questions'],
      'answers_surveys' => [answers_survey_attributes],
      'current_answers_survey' => answers_survey_attributes
    }.merge(survey_helper.transform_keys(&:to_s))
  end

  def survey_sym(_survey, answers_survey)
    answers_survey_attributes = answers_survey_sym(answers_survey)

    {
      questions: answers_survey_attributes[:questions],
      answers_surveys: [answers_survey_attributes],
      current_answers_survey: answers_survey_attributes
    }.merge(survey_helper)
  end
end
