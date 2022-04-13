class Answer::AnswerCreator < ::Base
  attr_reader :answer_params, :option_ids, :answer, :user

  def initialize(answer_params:, option_ids:, user:)
    super

    @answer_params = answer_params
    @option_ids = option_ids
    @user = user
    @answer = build_answer
  end

  def call
    authorize!

    answer.save!

    notify

    answer
  end

  private

  def build_answer
    @answer = Answer.new(@answer_params)

    @answer.options = Option.includes(%i[user question]).find(@option_ids) unless @answer.free_text? || !@option_ids

    @answer
  end

  def authorize
    AnswerPolicy.new(@user, @answer).create?
  end

  def authorize!
    raise Pundit::NotAuthorizedError unless authorize
  end

  def notify
    SlackService.call(message) if answers_survey.completed?
  end

  def message
    I18n.t('surveys.answered', **translate_arguments)
  end

  def translate_arguments
    {
      count_answers_surveys_answered: survey.answers_surveys.completed.count,
      survey_name: survey.name,
      teacher_email: survey.user.email
    }
  end

  def answers_survey
    @answers_survey ||= @answer.answers_survey
  end

  def survey
    @survey ||= answers_survey.survey
  end
end
