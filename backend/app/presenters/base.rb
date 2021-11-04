class Base
  def self.call(*args)
    new(*args).call
  end

  def call
    raise NotImplementedError, 'Add the #call method to your presenter.'
  end
end
