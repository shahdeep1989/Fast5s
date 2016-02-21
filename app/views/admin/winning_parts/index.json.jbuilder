json.array!(@winning_parts) do |winning_part|
  json.extract! winning_part, :id, :text_panel, :num_of_element
  json.url winning_part_url(winning_part, format: :json)
end
