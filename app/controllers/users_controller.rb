class UsersController < ApplicationController
  def create
    @user = User.create(user_params)

    if @user.valid?
      token = generate_token
      render json: { token: token }, status: :created
    else
      render json: { error: @user.errors&.messages }, status: :bad_request
    end
  end

  def login
    @user = User.find_by(email: user_params[:email])

    if @user&.authenticate(user_params[:password])
      token = generate_token
      render json: { token: token }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end

  def generate_token
    encode_token({
      user_email: @user.email,
      ttl: (Time.now + (ENV['TOKEN_TTL_IN_MINUTES'] || TOKEN_TTL_IN_MINUTES).to_i.minutes).to_i
    })
  end
end
