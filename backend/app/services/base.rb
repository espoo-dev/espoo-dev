class Base
  def initialize; end

  def self.call(*args, &block)
    new(*args, &block).call
  end

  def call
    raise NotImplementedError
  end
end
