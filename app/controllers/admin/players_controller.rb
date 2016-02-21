class Admin::PlayersController < Admin::BaseController
  before_action :set_admin_User, only: [:show, :edit, :update, :destroy]

  # GET /admin/Users
  # GET /admin/Users.json
  def index
    @admin_players = User.all
  end

  # GET /admin/Users/1
  # GET /admin/Users/1.json
  def show
  end

  # GET /admin/Users/new
  def new
    @admin_player = User.new
  end

  # GET /admin/Users/1/edit
  def edit
  end

  # POST /admin/Users
  # POST /admin/Users.json
  def create
    @admin_player = User.new(admin_User_params)

    respond_to do |format|
      if @admin_player.save
        format.html { redirect_to @admin_player, notice: 'User was successfully created.' }
        format.json { render :show, status: :created, location: @admin_User }
      else
        format.html { render :new }
        format.json { render json: @admin_player.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /admin/Users/1
  # PATCH/PUT /admin/Users/1.json
  def update
    respond_to do |format|
      if @admin_player.update(admin_User_params)
        format.html { redirect_to @admin_player, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @admin_User }
      else
        format.html { render :edit }
        format.json { render json: @admin_player.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /admin/Users/1
  # DELETE /admin/Users/1.json
  def destroy
    @admin_player.destroy
    respond_to do |format|
      format.html { redirect_to admin_players_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_admin_User
      @admin_player = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def admin_User_params
      params.require(:user).permit(:email, :first_name, :last_name, :password, :password_confirmation)
    end
end
