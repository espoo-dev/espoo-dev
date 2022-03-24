class Base
  def initialize; end

  def self.call(*args)
    new(*args).call
  end

  def call
    raise NotImplementedError
  end
end
