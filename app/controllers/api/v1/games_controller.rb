class Api::V1::GamesController < Api::V1::BaseController
	before_filter :authentication_user_with_authentication_token, :only => [:get_list, :search_game ,:get_next_game_number,:get_room_user_list]

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
			limit = 0
			limit = @game.winning_parts.map(&:num_of_element).inject(0){|sum,x| sum+x}
			@rooms = Room.where("game_id = ? and created_at > ? and status = ?", @game.id, Time.now - 2.minutes, "Active")
			if @rooms.present?
				puts "=====================+Room Present+====#{@rooms.first.tickets.count}=================="
				@room = @rooms.first
				@ticket = @room.tickets.build(:user_id => @current_user.id ,:num_array => generate_tickets(limit))
				@ticket.save
				puts "==================Ticket=========#{@ticket.inspect}"
				if @rooms.first.tickets.count == @game.num_of_player
					@rooms.first.status = "Deactive"
					@rooms.first.save
					@room = @rooms.first
				end
			else
				puts "===============+New Room+=================="
        generate_rooms
        @ticket = @room.tickets.build(:user_id => @current_user.id ,:num_array => generate_tickets(limit))
        @ticket.save
        puts "==================Ticket=========#{@ticket.inspect}"
			end
		else	
		end
	end

	def generate_tickets(limit)
		numbers = []
		loop do
			break if numbers.size == limit
      x = rand(99)
      unless numbers.include? x
      	numbers << x
      end
    end
    return numbers
	end	

	def generate_rooms
		number_of_array = (0..99).to_a.shuffle
		@room = @game.rooms.build(status: "Active", deactivation_time: Time.now + 2.minutes , num_array_to_pass: number_of_array)
		@room.save
		return @room
	end	

	def get_next_game_number
		@token = AuthenticationToken.current_authentication_token_for_user(@current_user.id,params[:authentication_token]).first
		if @token.present?
			@room = @current_user.tickets.find_by(:room_id => params[:room_id]).room
			if @room.present?
				if @room.num_array_to_pass.present?
					if params[:current_head].to_i == 100	
 						render_json({:result=>{ :errors => "Game is over"}}.to_json)
 					else
						@number = @room.num_array_to_pass[params[:current_head].to_i]
						render_json({:result=>{:messages =>"Ok",:rstatus=>1, :errorcode =>""},:data=>{:messages =>"your number is here " ,:number => @number}}.to_json)		
 					end
 				else
					render_json({:errors => "Please wait for some time to get the next number"}.to_json)
				end
			else
				render_json({:errors => "sorry room is not found"}.to_json)
			end
		else
			render_json({:errors => "No user found with authentication_token = #{params[:authentication_token]}"}.to_json)
		end
	end 


	def get_room_user_list
		@token = AuthenticationToken.current_authentication_token_for_user(@current_user.id,params[:authentication_token]).first
		if @token.present?
			@tickets =  Ticket.where(:room_id => params[:room_id].to_i)

			puts "-------------#{@tickets.count}"
			if !@tickets.present?
				render_json({:errors => "sorry room is not found"}.to_json)
			end
		else
			render_json({:errors => "No user found with authentication_token = #{params[:authentication_token]}"}.to_json)
		end

	end  

end