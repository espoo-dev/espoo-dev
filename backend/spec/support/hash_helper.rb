module HashHelper
  def self.included(base)
    base.class_eval do
      include HashHelperMethods
    end
  end

  def answers_survey_sym(answers_survey)
    survey = answers_survey.survey
    survey_questions = survey.questions
    survey_question = survey_questions.first
    survey_question_two = survey_questions.second
    survey_question_options = survey_question.options
    option = survey_question_options.first
    option_three = survey_question_options.second
    option_two = survey_question_two.options.first
    question_type = survey_question.question_type

    answered_question_attributes = answers_survey_questions_attributes_sym(survey_question, question_type, [option, option_three])

    unanswered_question_attributes = answers_survey_questions_attributes_sym(survey_question_two, question_type, [option_two])

    question_attributes = [
      answered_question_attributes,
      unanswered_question_attributes
    ]

    asnwers_survey_returned_params({ answers_survey: answers_survey, question_attributes: question_attributes, answered_question_attributes: answered_question_attributes,
                                     unanswered_question_attributes: unanswered_question_attributes }).transform_keys(&:to_sym)
  end

  def answers_survey_hash(answers_survey)
    survey = answers_survey.survey
    survey_questions = survey.questions
    survey_question = survey_questions.first
    survey_question_two = survey_questions.second
    survey_question_options = survey_question.options
    option = survey_question_options.first
    option_three = survey_question_options.second
    option_two = survey_question_two.options.first
    question_type = survey_question.question_type

    answered_question_attributes = answers_survey_questions_attributes_hash(survey_question, question_type, [option, option_three])

    unanswered_question_attributes = answers_survey_questions_attributes_hash(survey_question_two, question_type, [option_two])

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
    survey_question_options = survey_question.options
    option = survey_question_options.first
    option_three = survey_question_options.second
    question_type = survey_question.question_type

    {
      'id' => survey_question.id,
      'name' => survey_question.name,
      'question_type' => question_type(question_type),
      'options' => options_hash([option, option_three]),
      'answered_options' => options_hash([option_three]),
      'correct' => false
    }
  end

  def answers_survey_with_questions_hash(answers_survey)
    survey = answers_survey.survey
    survey_questions = survey.questions
    survey_question = survey_questions.first
    survey_question_two = survey_questions.second
    option_two = survey_question_two.options.first
    question_type = survey_question.question_type

    answered_question_attributes = answered_question_hash(answers_survey)

    unanswered_question_attributes = {
      'id' => survey_question_two.id,
      'name' => survey_question_two.name,
      'question_type' => question_type(question_type),
      'options' => options_hash([option_two]),
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
