class Admin::WinningPartsController <  Admin::BaseController
  before_action :set_winning_part, only: [:show, :edit, :update, :destroy]

  # GET /diagnoses
  # GET /diagnoses.json
  def index
    @winning_parts = WinningPart.all
  end

  # GET /diagnoses/1
  # GET /diagnoses/1.json
  def show
  end

  # GET /diagnoses/new
  def new
    @winning_part = WinningPart.new
  end

  # GET /diagnoses/1/edit
  def edit
  end

  # POST /diagnoses
  # POST /diagnoses.json
  def create
    @winning_part = WinningPart.new(winning_parts_params)
    if @winning_part.save
        redirect_to admin_winning_part_path(@winning_part), :notice => "Winning Part was successfully created."
    else
      flash.now[:alert] = @winning_part.errors.full_messages
      render :new
    end
  end

  # PATCH/PUT /diagnoses/1
  # PATCH/PUT /diagnoses/1.json
  def update
    if @winning_part.update(winning_parts_params)
       redirect_to admin_winning_part_path(@winning_part), :notice => "WinningPart was successfully updated."
    else
      flash.now[:alert] = @winning_part.errors.full_messages
      render :edit
    end
  end

  # DELETE /diagnoses/1
  # DELETE /diagnoses/1.json
  def destroy
     @winning_part.destroy
    redirect_to admin_winning_parts_path, notice: 'Game was successfully destroyed.'
  end

  def store_winning_part_cord
    params.delete(:utf8)
    params.delete(:authenticity_token)
    params.delete(:controller)
    params.delete(:action)

    params.keys.each do |key|
      @winning_part = WinningPart.find(key)
      @winning_part.update_attributes(:coordinates  => params["#{key}"])
    end  
    redirect_to assemble_game_admin_game_path(@winning_part.game.id)
  end  

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_winning_part
      @winning_part = WinningPart.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def winning_parts_params
        params.require(:winning_part).permit( :text_panel ,:num_of_element ,:part_color ,:game_id)
    end  


end
