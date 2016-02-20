json.result do
  json.messages "ok"
  json.rstatus  "1"
  json.errorcode ""
end
json.data do
  json.email @user.email  
  json.extract! @authentication_token, :auth_token
end