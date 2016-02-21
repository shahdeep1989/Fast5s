class  Admin::GamesController <  Admin::BaseController
 before_action :set_game, only: [:show, :edit, :update, :destroy]

  # GET /diagnoses
  # GET /diagnoses.json
  def index
    @games = Game.all
  end

  # GET /diagnoses/1
  # GET /diagnoses/1.json
  def show
  end

  # GET /diagnoses/new
  def new
    @game = Game.new
    @game.winning_parts.build
  end

  # GET /diagnoses/1/edit
  def edit
  end

  # POST /diagnoses
  # POST /diagnoses.json
  def create
    @game = Game.new(games_params)
    if @game.save
        redirect_to admin_game_path(@game), :notice => "Game was successfully created."
    else
      flash.now[:alert] = @game.errors.full_messages
      render :new
    end
  end

  # PATCH/PUT /diagnoses/1
  # PATCH/PUT /diagnoses/1.json
  def update
    if @game.update(games_params)
       redirect_to admin_game_path(@game), :notice => "Game was successfully updated."
    else
      flash.now[:alert] = @game.errors.full_messages
      render :edit
    end
  end

  # DELETE /diagnoses/1
  # DELETE /diagnoses/1.json
  def destroy
     @game.destroy
    redirect_to admin_games_path, notice: 'Game was successfully destroyed.'
  end

  def assemble_game
    @game = Game.find(params[:id])
    #redirect_to assemble_game_admin_game_path(params[:id])
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_game
      @game = Game.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def games_params
        params.require(:game).permit( :name ,:game_type ,:interval_sec ,:total_number_in_ticket ,:num_of_player,:game_image , winning_parts_attributes: [:id, :text_panel, :num_of_element ,:part_color, :_destroy])
    end
end