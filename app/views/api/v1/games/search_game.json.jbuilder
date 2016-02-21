json.result do
  json.messages "ok"
  json.rstatus  "1"
  json.errorcode ""
end
json.data do
  if @room.present?
    json.room_id @room.id
    json.game_start_time @room.deactivation_time.to_time
    json.ticket do
      json.numbers @ticket.num_array
    end
  end
end