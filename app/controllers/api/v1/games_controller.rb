require 'rufus-scheduler'

class Api::V1::GamesController < Api::V1::BaseController
	before_filter :authentication_user_with_authentication_token, :only => [:get_list, :search_game]
	scheduler = Rufus::Scheduler.new
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
			@part_counts = @room.game.winning_parts.map(&:num_of_element)

		else	
		end
	end

	def generate_tickets(limit)
		numbers = []
		loop do
			break if numbers.size == limit
      x = rand(100)
      unless numbers.include? x
      	numbers << x
      end
    end
    return numbers
	end	

	def generate_rooms
		@room = @game.rooms.build(status: "Active", deactivation_time: Time.now + 2.minutes)
		@room.save
		# scheduler.at @room.deactivation_time do
		# 	total_numbers = []
		# 	scheduler.every '#{@game.interval_sec.to_i}s' do
		# 		x = rand(100)
		# 		if @room.num_array_to_pass.size < 100 && !@room.include? x
		# 		else
		# 		end
		# 	end
		# end
		return @room
	end	

	def get_next_game_number
		@token = AuthenticationToken.current_authentication_token_for_user(@current_user.id,params[:authentication_token]).first
		if @token.present?
			@room = @current_user.tickets.find_by(:room_id => params[:room_id]).room
			if @room.present?
				if @room.num_array_to_pass.present?
					@number = @room.num_array_to_pass.last
					render_json({:result=>{:messages =>"Ok",:rstatus=>1, :errorcode =>""},:data=>{:messages =>"your number is here " ,:number => @number}}.to_json)
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

end