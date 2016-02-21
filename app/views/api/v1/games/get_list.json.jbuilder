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
      json.interval_sec game.interval_sec
    	json.number_of_player game.num_of_player
      json.game_image  Rails.application.secrets.host+game.game_image.url
      json.winning_parts do
        json.array! game.winning_parts.each do |winning_part|
          json.text_panel winning_part.text_panel
          json.coordinate_x winning_part.coordinate_x
          json.coordinate_y winning_part.coordinate_y
          json.num_of_element winning_part.num_of_element
        end
      end
    end
  end
end