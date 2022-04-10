class Answer::AnswerCreator < ::Base
  attr_reader :answer_params, :option_ids, :user

  def initialize(answer_params:, option_ids:, user:)
    @answer_params = answer_params
    @option_ids = option_ids
    @user = user
  end

  def call
    build_answer

    authorize!

    save!

    notify

    @answer
  end

  private

  def build_answer
    @answer = Answer.new(@answer_params)

    unless @answer.free_text? || !@option_ids
      @answer.options = Option.find(@option_ids)
    end
  end

  def authorize!
    raise Pundit::NotAuthorizedError unless AnswerPolicy.new(@user, @answer).create?
  end

  def save!
    @answer.save!
  end

  def notify
    SlackService.call(message) if answers_survey.completed?
  end

  def answers_survey
    @answers_survey ||= @answer.answers_survey
  end

  def message
    I18n.t('surveys.answered', **translate_args)
  end

  def translate_args
    {
      count_answers_surveys_answered: survey.answers_surveys.completed.count.count,
      survey_name: survey.name,
      teacher_email: survey.user.email,
    }
  end

  def survey
    @survey ||= answers_survey.survey
  end
end
