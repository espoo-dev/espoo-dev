require 'devise/jwt/test_helpers'

describe JwtExampleController do
  let(:headers) do
    { 'Accept' => 'application/json' }
  end

  it 'returns 200 when token is valid' do
    user = create(:user)
    auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, user)
    get '/jwt_example', headers: auth_headers
    expect(response.status).to eq 200
  end

  it 'returns 401 when token is not valid' do
    user = build(:user)
    auth_headers = Devise::JWT::TestHelpers.auth_headers(headers, user)
    get '/jwt_example', headers: auth_headers
    expect(response.status).to eq 401
  end

  describe '.sign_in' do
    let(:user) { create(:user) }

    describe 'when data is valid' do
      let(:params) do
        { user: { 'email' => user.email, 'password' => user.password } }
      end

      before do
        post '/users/sign_in', params: params, headers: headers
      end

      it { expect(response.status).to eq 200 }

      it { expect(response.header['Authorization']).to start_with('Bearer') }

      it 'return user data' do
        body = JSON.parse response.body
        expect(body).to include(
          'id' => user.id,
          'email' => user.email,
          'phone' => user.phone
        )
      end
    end
  end
end
