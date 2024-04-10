class CreateShares < ActiveRecord::Migration[7.1]
  def change
    create_table :shares do |t|
      t.string :title
      t.string :url
      t.string :user_email
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
