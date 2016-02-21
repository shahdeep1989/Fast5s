class Admin::WinnersController < Admin::BaseController

  def index
    @winners = Winner.all
  end

end	

