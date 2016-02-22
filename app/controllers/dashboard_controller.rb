class DashboardController < ApplicationController
  layout 'admin'
	def index
		if user_signed_in?
		  	if current_user.email == "admin@housie.com" || current_user.email == "shahdeep1989@gmail.com"
		  		redirect_to admin_root_path
		  	end
  		else
  			redirect_to new_user_session_path
  		end
	end
end