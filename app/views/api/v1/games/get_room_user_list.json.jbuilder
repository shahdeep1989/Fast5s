json.result do
  json.messages "ok"
  json.rstatus  "1"
  json.errorcode ""
end
json.data do
  if @tickets.present?
    json.array! @tickets.each do |ticket|
    	json.id ticket.user.id
    	json.name ticket.user.full_name
     	json.email ticket.user.email
    end
  end
end