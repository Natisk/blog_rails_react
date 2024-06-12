# frozen_string_literal: true

class Post < ApplicationRecord
  validates :title, length: { minimum: 5 }
end
