json.result do
  json.messages "ok"
  json.rstatus  "1"
  json.errorcode ""
end
json.data do
  if @room.present?
    json.room_id @room.id
    json.ticket do
      json.numbers @ticket.num_array
    end
  end
end