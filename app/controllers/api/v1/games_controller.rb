class Api::V1::GamesController < Api::V1::BaseController
	before_filter :authentication_user_with_authentication_token, :only => [:get_list]

	def get_list
		@token = AuthenticationToken.current_authentication_token_for_user(@current_user.id,params[:authentication_token]).first
		if @token.present?
			@games = Game.all.includes(:winning_parts)
			unless @games.present?
				render_json({:errors => "No games present"}.to_json)
			end
		else
			render_json({:errors => "No user found with authentication_token = #{params[:authentication_token]}"}.to_json)
		end
	end
end