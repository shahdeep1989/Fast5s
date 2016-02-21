json.array!(@admin_players) do |admin_player|
  json.extract! admin_player, :id, :email, :first_name, :last_name, :password, :password_confirmation
  json.url admin_player_url(admin_player, format: :json)
end
