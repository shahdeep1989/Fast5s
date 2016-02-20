class DashboardController < ApplicationController
  layout 'admin'
	def index
		if user_signed_in?
		  	if current_user.email != "admin@housie.com"
		  		redirect_to new_user_session_path
		  	end
  		else
  			redirect_to new_user_session_path
  		end
	end
end