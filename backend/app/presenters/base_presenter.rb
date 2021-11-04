class BasePresenter
  def self.payload(*args)
    new(*args).payload
  end

  def payload
    raise NotImplementedError, 'Add the #payload method to your presenter.'
  end
end
