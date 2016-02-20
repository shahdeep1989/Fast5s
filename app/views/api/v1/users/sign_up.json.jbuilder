json.result do
  json.messages "ok"
  json.rstatus  "1"
  json.errorcode ""
end
json.data do
  json.email @user.email
  json.first_name @user.first_name
  json.last_name @user.last_name
  json.shop_name @user.shop_name
  json.shop_address @user.shop_address
  json.shop_email @user.shop_email
  json.user_id @user.id
  json.extract! @authentication_token, :auth_token
end