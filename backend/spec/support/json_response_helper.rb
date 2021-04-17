require 'devise/jwt/test_helpers'

module JsonResponseHelper
  def auth_headers
    headers = {
      'Accept' => 'application/json'
    }
    user = create(:user)
    Devise::JWT::TestHelpers.auth_headers(headers, user)
  end

  def response_body
    JSON.parse(response.body)
  end
end
