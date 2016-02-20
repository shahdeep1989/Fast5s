class Admin::BaseController < ApplicationController
	before_action :authenticate_user!, :check_for_admin
	layout 'admin'
	
	def check_for_admin
		if user_signed_in?
			puts "hi test run"
		  	if current_user.email != "admin@housie.com"
		  		redirect_to new_user_session_path
		  	end
  		else
  			redirect_to new_user_session_path
  		end
	end

end