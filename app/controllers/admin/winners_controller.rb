class Admin::WinnersController < Admin::BaseController

  def index
    @winners = Winner.all.order(:created_at => :desc)
  end

end	

