class User::UserCreator < ::Base
  attr_reader :user

  def initialize(user_params:)
    super()

    @user = build_user(user_params)
  end

  def call
    authorize!

    user.save!

    notify_on_slack

    user
  end

  private

  def authorize
    UserPolicy.new(nil, user).create?
  end

  def authorize!
    raise Pundit::NotAuthorizedError, 'not allowed to create? this User' unless authorize
  end

  def build_user(user_params)
    User.new(user_params)
  end

  def notify_on_slack
    NotificationSlackJob.perform_later(message: message)
  end

  def message
    I18n.t('users.create', **translate_arguments)
  end

  def translate_arguments
    {
      role: user.role.role_type.humanize,
      date: user.created_at,
      admin: Role.users_by_type(Role::ADMIN).count,
      teacher: Role.users_by_type(Role::TEACHER).count,
      student: Role.users_by_type(Role::STUDENT).count,
      total: User.count
    }
  end
end
