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
      json.name game.description
      json.interval_sec game.interval_sec
    	json.number_of_player game.num_of_player
      json.game_image  Rails.application.secrets.host+game.game_image.url
      json.winning_parts do
        json.array! game.winning_parts.each do |winning_part|
          json.id winning_part.id
          json.text_panel winning_part.text_panel
          json.num_of_element winning_part.num_of_element
          json.coordinates do
            json.x_axes winning_part.coordinates.split(",").values_at(* winning_part.coordinates.split(",").each_index.select {|i| i.even?})
            json.y_axes winning_part.coordinates.split(",").values_at(* winning_part.coordinates.split(",").each_index.select {|i| i.odd?})
          end
        end
      end
    end
  end
end