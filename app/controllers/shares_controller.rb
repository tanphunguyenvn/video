class SharesController < ApplicationController
  before_action :authenticate_user
  before_action :set_share, only: [:show]

  # GET /shares
  def index
    @shares = Share.all

    render json: @shares
  end

  # GET /shares/{id}
  def show
    render json: @share
  end

  # POST /shares
  def create
    @share = Share.new(share_params)
    @share.user_id = @user.id
    @share.user_email = @user.email

    if @share.save
      render json: @share, status: :created
    else
      render json: @share.errors, status: :unprocessable_entity
    end
  end

  private
    def set_share
      @share = Share.find(params[:id])
    end

    def share_params
      params.require(:share).permit(:title, :url)
    end
end
