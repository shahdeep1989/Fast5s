json.array!(@games) do |game|
  json.extract! game, :id, :name, :game_type, :interval_in_sec, :total_num_in_ticket, :num_of_player
  json.url game_url(game, format: :json)
end
