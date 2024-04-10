class ApplicationController < ActionController::API
  def encode_token payload
    JWT.encode payload, ENV['TOKEN_SECRET'] || TOKEN_SECRET, TOKEN_ALGORITHM
  end

  def decode_token
    auth_header = request.headers['Authorization']
    if auth_header
      token = auth_header&.split(' ')[1]
      begin
        JWT.decode(token, ENV['TOKEN_SECRET'] || 'token_secret', algorithm: 'HS256')
      rescue JWT::DecodeError
        nil
      end
    end
  end

  def valid_token
    decoded_token = decode_token
    if decode_token
      ttl = decoded_token[0]['ttl']
      if Time.now.to_i > Time.at(ttl).to_i
        return [MESSAGE_TOKEN_EXPIRED, :unauthorized]
      end

      user_email = decoded_token[0]['user_email']
      @user = User.find_by(email: user_email)
      ['', :ok]
    else
      [MESSAGE_TOKEN_REQUIRE, :bad_request]
    end
  end

  def authenticate_user
    message, status = valid_token
    render json: { message: message }, status: status if status != :ok
  end
end
