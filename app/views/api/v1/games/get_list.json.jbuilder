json.result do
  json.messages "ok"
  json.rstatus  "1"
  json.errorcode ""
end
json.data do
  if @games.present?
    json.array! @games.each do |game|
    	json.id game.id
    	json.name game.name
    	json.number_of_player game.num_of_player
    end
  end
end