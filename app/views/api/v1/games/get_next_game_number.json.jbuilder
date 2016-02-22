json.result do
  json.messages "ok"
  json.rstatus  "1"
  json.errorcode ""
end
json.data do
	json.number @number
		json.winners do
		if @winners.present?
	    	json.array! @winners.each do |winner|
	    		json.id winner.user.id
	    		json.name winner.user.full_name
	     		json.email winner.user.email
	     		if winner.winning_part_id.present?
	     			json.winning_part_id winner.winning_part.id 
	     			json.winning_part_name winner.winning_part.text_panel
	    		else
	    			json.winning_part_id 0
	    			json.winning_part_name "fullhouse"
	    		end
	    	end
  		end
  	end
end