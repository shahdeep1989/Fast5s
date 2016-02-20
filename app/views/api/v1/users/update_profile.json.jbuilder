json.result do
  json.messages "ok"
  json.rstatus  "1"
  json.errorcode ""
end
json.data do
  json.email @current_user.email
  json.first_name @current_user.first_name
  json.last_name @current_user.last_name
  json.shop_name @current_user.shop_name
  json.shop_address     @current_user.shop_address
  json.shop_email @current_user.shop_email
end