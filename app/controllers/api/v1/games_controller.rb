class Api::V1::GamesController < Api::V1::BaseController
	before_filter :authentication_user_with_authentication_token, :only => [:get_list, :search_game]

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

	def search_game
		@token = AuthenticationToken.current_authentication_token_for_user(@current_user.id,params[:authentication_token]).first
		if @token.present?
			@game = Game.find(params[:game_id])
			@rooms = Room.where("game_id = ? and created_at > ? and status = ?", @game.id, Time.now - 10.minutes, true)
			if @rooms.present?
				if @room.tickets.count < game.num_of_player # check total maximum player in room 
					@room.tickets.build(:user_id => @current_user.id ,:num_array => @room.num_array_to_pass.shuffle)
				else	
					generate_rooms
        end
			else
        generate_rooms
			end
		else	
		end
	end

	def generate_tickets(limit, max_number)
		numbers = []
		loop do
      x = rand(max_number)
      unless numbers.include? x
      	numbers << x
      end
      break if numbers.size == limit
    end
    return numbers
	end	

	def generate_rooms
		if @game.game_type == 1 # numbers in ticket
			nums = @game.total_number_in_ticket.times.map{Random.rand(99) }
		elsif @game.game_type == 2 # alphabates in ticket
			nums = @game.total_number_in_ticket.times.map { (65 + rand(26)).chr }
		end	
		game.rooms.build(:num_array_to_pass => nums)
	end	
end